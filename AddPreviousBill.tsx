import React, { useState, useRef, useEffect } from 'react';
import { ShopConfig, PendingBill, BillData } from './types';
import { printThermalBill } from './ThermalPrintManager';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  washType: 'WASH' | 'IRON' | 'WASH+IRON' | 'DRY CLEAN';
  total: number;
}

interface Customer {
  name: string;
  phone: string;
}

interface AddPreviousBillProps {
  onClose: () => void;
  onBillAdded: () => void;
}

const AddPreviousBill: React.FC<AddPreviousBillProps> = ({ onClose, onBillAdded }) => {
  const [customer, setCustomer] = useState<Customer>({ name: '', phone: '' });
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [currentItem, setCurrentItem] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [currentWashType, setCurrentWashType] = useState<'WASH' | 'IRON' | 'WASH+IRON' | 'DRY CLEAN'>('WASH');
  const [currentQuantity, setCurrentQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [billDate, setBillDate] = useState(new Date().toISOString().split('T')[0]);
  const [shopConfig, setShopConfig] = useState<ShopConfig>({
    shopName: 'GenZ Laundry',
    address: '123 Main Street, City',
    contact: '+91 9876543210',
    gstNumber: ''
  });
  
  const itemInputRef = useRef<HTMLInputElement>(null);

  const quickItems = [
    { name: 'Shirt', price: 60, washTypes: ['WASH', 'IRON', 'WASH+IRON'], icon: '👔' },
    { name: 'Pant', price: 70, washTypes: ['WASH', 'IRON', 'WASH+IRON'], icon: '👖' },
    { name: 'T-Shirt', price: 40, washTypes: ['WASH', 'IRON'], icon: '👕' },
    { name: 'Saree', price: 150, washTypes: ['WASH', 'DRY CLEAN'], icon: '🥻' },
    { name: 'Suit', price: 300, washTypes: ['DRY CLEAN'], icon: '🤵' },
    { name: 'Bedsheet', price: 100, washTypes: ['WASH'], icon: '🛏️' },
    { name: 'Curtain', price: 120, washTypes: ['WASH', 'DRY CLEAN'], icon: '🪟' },
    { name: 'Towel', price: 30, washTypes: ['WASH'], icon: '🏖️' }
  ];

  useEffect(() => {
    loadShopConfig();
    if (itemInputRef.current) {
      itemInputRef.current.focus();
    }
  }, []);

  const loadShopConfig = () => {
    const saved = localStorage.getItem('laundry_shop_config');
    if (saved) {
      setShopConfig(JSON.parse(saved));
    }
  };

  const addItemToOrder = () => {
    if (!currentItem || !currentPrice) {
      alert('Please enter item name and price');
      return;
    }

    const price = parseFloat(currentPrice);
    if (isNaN(price) || price <= 0) {
      alert('Please enter a valid price');
      return;
    }

    const newItem: OrderItem = {
      id: `${Date.now()}-${Math.random()}`,
      name: currentItem,
      quantity: currentQuantity,
      price: price,
      washType: currentWashType,
      total: price * currentQuantity
    };

    setOrderItems([...orderItems, newItem]);
    setCurrentItem('');
    setCurrentPrice('');
    setCurrentQuantity(1);
    if (itemInputRef.current) {
      itemInputRef.current.focus();
    }
  };

  const addQuickItem = (item: typeof quickItems[0]) => {
    setCurrentItem(item.name);
    setCurrentPrice(item.price.toString());
    setCurrentWashType(item.washTypes[0] as any);
  };

  const removeItem = (id: string) => {
    setOrderItems(orderItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setOrderItems(orderItems.map(item => 
      item.id === id 
        ? { ...item, quantity, total: item.price * quantity }
        : item
    ));
  };

  const calculateSubtotal = () => orderItems.reduce((sum, item) => sum + item.total, 0);
  const calculateTotal = () => calculateSubtotal() - discount + deliveryCharge;

  const savePreviousBill = () => {
    if (!customer.name || orderItems.length === 0) {
      alert('Please enter customer name and add items');
      return;
    }

    const billNumber = `GZ${Date.now().toString().slice(-6)}`;
    const billData: BillData = {
      businessName: shopConfig.shopName,
      address: shopConfig.address,
      phone: shopConfig.contact,
      billNumber,
      customerName: customer.name,
      items: orderItems.map(item => ({
        name: `${item.name} (${item.washType})`,
        quantity: item.quantity,
        rate: item.price,
        amount: item.total
      })),
      subtotal: calculateSubtotal(),
      discount,
      deliveryCharge,
      grandTotal: calculateTotal(),
      thankYouMessage: 'Thank you for choosing us!'
    };

    const pendingBill: PendingBill = {
      ...billData,
      id: `${Date.now()}-${Math.random()}`,
      status: 'pending',
      createdAt: new Date(billDate).toISOString()
    };

    // Save to pending bills
    const existingBills = JSON.parse(localStorage.getItem('laundry_pending_bills') || '[]');
    existingBills.push(pendingBill);
    localStorage.setItem('laundry_pending_bills', JSON.stringify(existingBills));

    alert(`Previous bill added successfully!\nBill Number: ${billNumber}\nCustomer: ${customer.name}\nTotal: ₹${calculateTotal()}`);
    onBillAdded();
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '20px',
        width: '90%',
        maxWidth: '1200px',
        height: '90%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
      }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          padding: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h2 style={{ color: 'white', margin: 0, fontSize: '24px' }}>
            📋 Add Previous Pending Bill
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 0, 0, 0.3)',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 15px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            ✕ Close
          </button>
        </div>

        {/* Content */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Left Panel */}
          <div style={{ width: '60%', padding: '20px', overflow: 'auto' }}>
            {/* Customer & Date Section */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '15px',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <h3 style={{ color: 'white', marginBottom: '15px' }}>👤 Customer & Date Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 200px', gap: '15px' }}>
                <input
                  type="text"
                  placeholder="Customer Name *"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '16px'
                  }}
                />
                <input
                  type="tel"
                  placeholder="📱 Phone Number"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '16px'
                  }}
                />
                <input
                  type="date"
                  value={billDate}
                  onChange={(e) => setBillDate(e.target.value)}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '16px'
                  }}
                />
              </div>
            </div>

            {/* Item Entry */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '15px',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <h3 style={{ color: 'white', marginBottom: '15px' }}>➕ Add Items</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '10px', alignItems: 'end' }}>
                <input
                  ref={itemInputRef}
                  type="text"
                  placeholder="Item name"
                  value={currentItem}
                  onChange={(e) => setCurrentItem(e.target.value)}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '16px'
                  }}
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={currentPrice}
                  onChange={(e) => setCurrentPrice(e.target.value)}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '16px'
                  }}
                />
                <input
                  type="number"
                  value={currentQuantity}
                  onChange={(e) => setCurrentQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '16px'
                  }}
                />
                <select
                  value={currentWashType}
                  onChange={(e) => setCurrentWashType(e.target.value as any)}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '16px'
                  }}
                >
                  <option value="WASH">WASH</option>
                  <option value="IRON">IRON</option>
                  <option value="WASH+IRON">WASH+IRON</option>
                  <option value="DRY CLEAN">DRY CLEAN</option>
                </select>
                <button
                  onClick={addItemToOrder}
                  style={{
                    padding: '12px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #27ae60, #2ecc71)',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  ➕ ADD
                </button>
              </div>
            </div>

            {/* Quick Items */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '15px',
              padding: '20px'
            }}>
              <h3 style={{ color: 'white', marginBottom: '15px' }}>⚡ Quick Items</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
                {quickItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => addQuickItem(item)}
                    style={{
                      padding: '15px 10px',
                      borderRadius: '10px',
                      border: 'none',
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ fontSize: '20px', marginBottom: '5px' }}>{item.icon}</div>
                    <div>{item.name}</div>
                    <div style={{ fontSize: '10px', opacity: 0.8 }}>₹{item.price}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Bill Summary */}
          <div style={{ width: '40%', padding: '20px', borderLeft: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '15px',
              padding: '20px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <h3 style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>
                🧾 Bill Summary
              </h3>

              {/* Items List */}
              <div style={{ flex: 1, overflow: 'auto', marginBottom: '20px' }}>
                {orderItems.length === 0 ? (
                  <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)', padding: '40px 0' }}>
                    No items added yet
                  </div>
                ) : (
                  <div style={{ display: 'grid', gap: '10px' }}>
                    {orderItems.map((item) => (
                      <div key={item.id} style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        padding: '12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div style={{ color: 'white', flex: 1 }}>
                          <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{item.name}</div>
                          <div style={{ fontSize: '12px', opacity: 0.8 }}>
                            {item.washType} • Qty: {item.quantity} • ₹{item.price} each
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ color: 'white', fontWeight: 'bold' }}>₹{item.total}</div>
                          <button
                            onClick={() => removeItem(item.id)}
                            style={{
                              background: 'rgba(255, 0, 0, 0.3)',
                              border: 'none',
                              borderRadius: '4px',
                              padding: '4px 8px',
                              color: 'white',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Discount & Delivery */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ color: 'white', display: 'block', marginBottom: '5px', fontSize: '14px' }}>
                      Discount (₹)
                    </label>
                    <input
                      type="number"
                      value={discount}
                      onChange={(e) => setDiscount(Math.max(0, parseFloat(e.target.value) || 0))}
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '6px',
                        border: 'none',
                        background: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ color: 'white', display: 'block', marginBottom: '5px', fontSize: '14px' }}>
                      Delivery (₹)
                    </label>
                    <input
                      type="number"
                      value={deliveryCharge}
                      onChange={(e) => setDeliveryCharge(Math.max(0, parseFloat(e.target.value) || 0))}
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '6px',
                        border: 'none',
                        background: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Totals */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', color: 'white' }}>
                  <span>Subtotal:</span>
                  <span>₹{calculateSubtotal()}</span>
                </div>
                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', color: '#e74c3c' }}>
                    <span>Discount:</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                {deliveryCharge > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', color: '#f39c12' }}>
                    <span>Delivery:</span>
                    <span>+₹{deliveryCharge}</span>
                  </div>
                )}
                <hr style={{ margin: '10px 0', border: '1px solid rgba(255, 255, 255, 0.3)' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
                  <span>TOTAL:</span>
                  <span>₹{calculateTotal()}</span>
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={savePreviousBill}
                disabled={!customer.name || orderItems.length === 0}
                style={{
                  width: '100%',
                  padding: '15px',
                  borderRadius: '10px',
                  border: 'none',
                  background: (!customer.name || orderItems.length === 0) 
                    ? 'rgba(189, 195, 199, 0.5)' 
                    : 'linear-gradient(135deg, #27ae60, #2ecc71)',
                  color: 'white',
                  cursor: (!customer.name || orderItems.length === 0) ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                💾 Save Previous Bill
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPreviousBill;