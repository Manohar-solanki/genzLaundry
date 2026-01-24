import React, { useState, useEffect } from 'react';
import { ShopConfig, PendingBill, BillData } from './types';
import { printThermalBill } from './ThermalPrintManager';
import AddPreviousBill from './AddPreviousBill';

interface AdminDashboardProps {
  onBackToBilling: () => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToBilling, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'pending' | 'history'>('settings');
  const [shopConfig, setShopConfig] = useState<ShopConfig>({
    shopName: 'GenZ Laundry',
    address: '123 Main Street, City',
    contact: '+91 9876543210',
    gstNumber: ''
  });
  const [pendingBills, setPendingBills] = useState<PendingBill[]>([]);
  const [billHistory, setBillHistory] = useState<PendingBill[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddPreviousBill, setShowAddPreviousBill] = useState(false);

  // Load data on component mount
  useEffect(() => {
    loadShopConfig();
    loadPendingBills();
    loadBillHistory();
  }, []);

  const loadShopConfig = () => {
    const saved = localStorage.getItem('laundry_shop_config');
    if (saved) {
      setShopConfig(JSON.parse(saved));
    }
  };

  const saveShopConfig = () => {
    localStorage.setItem('laundry_shop_config', JSON.stringify(shopConfig));
    alert('Shop settings saved successfully!');
  };

  const loadPendingBills = () => {
    const saved = localStorage.getItem('laundry_pending_bills');
    if (saved) {
      setPendingBills(JSON.parse(saved));
    }
  };

  const loadBillHistory = () => {
    const saved = localStorage.getItem('laundry_bill_history');
    if (saved) {
      setBillHistory(JSON.parse(saved));
    }
  };

  const savePendingBills = (bills: PendingBill[]) => {
    localStorage.setItem('laundry_pending_bills', JSON.stringify(bills));
    setPendingBills(bills);
  };

  const saveBillHistory = (bills: PendingBill[]) => {
    localStorage.setItem('laundry_bill_history', JSON.stringify(bills));
    setBillHistory(bills);
  };

  const markBillAsCompleted = (billId: string) => {
    const bill = pendingBills.find(b => b.id === billId);
    if (bill) {
      const updatedBill = { ...bill, status: 'completed' as const };
      const remainingPending = pendingBills.filter(b => b.id !== billId);
      const updatedHistory = [...billHistory, updatedBill];
      
      savePendingBills(remainingPending);
      saveBillHistory(updatedHistory);
    }
  };

  const markBillAsDelivered = (billId: string) => {
    const bill = pendingBills.find(b => b.id === billId) || billHistory.find(b => b.id === billId);
    if (bill) {
      const updatedBill = { 
        ...bill, 
        status: 'delivered' as const, 
        deliveredAt: new Date().toISOString() 
      };
      
      const remainingPending = pendingBills.filter(b => b.id !== billId);
      const updatedHistory = billHistory.filter(b => b.id !== billId);
      updatedHistory.push(updatedBill);
      
      savePendingBills(remainingPending);
      saveBillHistory(updatedHistory);
    }
  };

  const reprintBill = (bill: PendingBill) => {
    const billData: BillData = {
      businessName: shopConfig.shopName,
      address: shopConfig.address,
      phone: shopConfig.contact,
      billNumber: bill.billNumber,
      customerName: bill.customerName,
      items: bill.items,
      subtotal: bill.subtotal,
      discount: bill.discount,
      deliveryCharge: bill.deliveryCharge,
      grandTotal: bill.grandTotal,
      thankYouMessage: 'Thank you for choosing us!'
    };
    
    printThermalBill(billData);
  };

  const filteredPendingBills = pendingBills.filter(bill =>
    bill.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBillHistory = billHistory.filter(bill =>
    bill.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '15px',
        padding: '20px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '24px' }}>
          🛠️ Admin Dashboard
        </h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onBackToBilling}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            🧾 Back to Billing
          </button>
          <button
            onClick={onLogout}
            style={{
              background: 'rgba(255, 0, 0, 0.3)',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '15px',
        padding: '10px',
        marginBottom: '20px',
        display: 'flex',
        gap: '10px'
      }}>
        {[
          { key: 'settings', label: '⚙️ Store Settings', icon: '⚙️' },
          { key: 'pending', label: '📋 Pending Bills', icon: '📋' },
          { key: 'history', label: '📊 Bill History', icon: '📊' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            style={{
              background: activeTab === tab.key ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 20px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeTab === tab.key ? 'bold' : 'normal'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '15px',
        padding: '30px',
        minHeight: '500px'
      }}>
        {activeTab === 'settings' && (
          <div>
            <h2 style={{ color: 'white', marginBottom: '30px' }}>🏪 Store Configuration</h2>
            <div style={{ display: 'grid', gap: '20px', maxWidth: '500px' }}>
              <div>
                <label style={{ color: 'white', display: 'block', marginBottom: '8px' }}>
                  Store Name
                </label>
                <input
                  type="text"
                  value={shopConfig.shopName}
                  onChange={(e) => setShopConfig({...shopConfig, shopName: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '16px'
                  }}
                />
              </div>
              
              <div>
                <label style={{ color: 'white', display: 'block', marginBottom: '8px' }}>
                  Address
                </label>
                <textarea
                  value={shopConfig.address}
                  onChange={(e) => setShopConfig({...shopConfig, address: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '16px',
                    minHeight: '80px',
                    resize: 'vertical'
                  }}
                />
              </div>
              
              <div>
                <label style={{ color: 'white', display: 'block', marginBottom: '8px' }}>
                  Contact Number
                </label>
                <input
                  type="text"
                  value={shopConfig.contact}
                  onChange={(e) => setShopConfig({...shopConfig, contact: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '16px'
                  }}
                />
              </div>
              
              <div>
                <label style={{ color: 'white', display: 'block', marginBottom: '8px' }}>
                  GST Number (Optional)
                </label>
                <input
                  type="text"
                  value={shopConfig.gstNumber || ''}
                  onChange={(e) => setShopConfig({...shopConfig, gstNumber: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '16px'
                  }}
                />
              </div>
              
              <button
                onClick={saveShopConfig}
                style={{
                  background: 'linear-gradient(45deg, #4CAF50, #45a049)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '15px 30px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginTop: '20px'
                }}
              >
                💾 Save Settings
              </button>
            </div>
          </div>
        )}

        {activeTab === 'pending' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ color: 'white', margin: 0 }}>📋 Pending Bills ({pendingBills.length})</h2>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button
                  onClick={() => setShowAddPreviousBill(true)}
                  style={{
                    background: 'linear-gradient(135deg, #3498db, #2980b9)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  ➕ Add Previous Bill
                </button>
                <input
                  type="text"
                  placeholder="Search by customer name or bill number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.9)',
                    width: '300px'
                  }}
                />
              </div>
            </div>
            
            {filteredPendingBills.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'white', padding: '50px' }}>
                <h3>No pending bills found</h3>
                <p>All bills are completed or no bills match your search.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '15px' }}>
                {filteredPendingBills.map(bill => (
                  <div key={bill.id} style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{ color: 'white' }}>
                      <h4 style={{ margin: '0 0 5px 0' }}>{bill.customerName}</h4>
                      <p style={{ margin: '0 0 5px 0', opacity: 0.8 }}>Bill: {bill.billNumber}</p>
                      <p style={{ margin: '0 0 5px 0', opacity: 0.8 }}>
                        Items: {bill.items.length} | Total: ₹{bill.grandTotal}
                      </p>
                      <p style={{ margin: 0, opacity: 0.6, fontSize: '12px' }}>
                        Created: {new Date(bill.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => reprintBill(bill)}
                        style={{
                          background: 'rgba(0, 123, 255, 0.8)',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '8px 15px',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        🖨️ Reprint
                      </button>
                      <button
                        onClick={() => markBillAsCompleted(bill.id)}
                        style={{
                          background: 'rgba(40, 167, 69, 0.8)',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '8px 15px',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        ✅ Complete
                      </button>
                      <button
                        onClick={() => markBillAsDelivered(bill.id)}
                        style={{
                          background: 'rgba(255, 193, 7, 0.8)',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '8px 15px',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        🚚 Deliver
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ color: 'white', margin: 0 }}>📊 Bill History ({billHistory.length})</h2>
              <input
                type="text"
                placeholder="Search by customer name or bill number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'rgba(255, 255, 255, 0.9)',
                  width: '300px'
                }}
              />
            </div>
            
            {filteredBillHistory.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'white', padding: '50px' }}>
                <h3>No bill history found</h3>
                <p>No completed bills or no bills match your search.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '15px' }}>
                {filteredBillHistory.map(bill => (
                  <div key={bill.id} style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{ color: 'white' }}>
                      <h4 style={{ margin: '0 0 5px 0' }}>{bill.customerName}</h4>
                      <p style={{ margin: '0 0 5px 0', opacity: 0.8 }}>Bill: {bill.billNumber}</p>
                      <p style={{ margin: '0 0 5px 0', opacity: 0.8 }}>
                        Items: {bill.items.length} | Total: ₹{bill.grandTotal}
                      </p>
                      <p style={{ margin: 0, opacity: 0.6, fontSize: '12px' }}>
                        Status: <span style={{ 
                          background: bill.status === 'delivered' ? '#28a745' : '#ffc107',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          color: 'white',
                          fontSize: '11px'
                        }}>
                          {bill.status.toUpperCase()}
                        </span>
                      </p>
                      {bill.deliveredAt && (
                        <p style={{ margin: 0, opacity: 0.6, fontSize: '12px' }}>
                          Delivered: {new Date(bill.deliveredAt).toLocaleString()}
                        </p>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => reprintBill(bill)}
                        style={{
                          background: 'rgba(0, 123, 255, 0.8)',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '8px 15px',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        🖨️ Reprint
                      </button>
                      {bill.status !== 'delivered' && (
                        <button
                          onClick={() => markBillAsDelivered(bill.id)}
                          style={{
                            background: 'rgba(255, 193, 7, 0.8)',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '8px 15px',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          🚚 Mark Delivered
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Previous Bill Modal */}
      {showAddPreviousBill && (
        <AddPreviousBill
          onClose={() => setShowAddPreviousBill(false)}
          onBillAdded={() => {
            loadPendingBills();
            setActiveTab('pending');
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;