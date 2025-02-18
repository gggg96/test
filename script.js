let selectedProduct = {};

function showOrderForm(productName, productPrice) {
    selectedProduct = {
        name: productName,
        price: productPrice
    };
    
    document.getElementById('productName').value = productName;
    document.getElementById('productPrice').value = productPrice;
    document.getElementById('orderOverlay').style.display = 'block';
}

function closeOrderForm() {
    document.getElementById('orderOverlay').style.display = 'none';
    selectedProduct = {};
}

function submitOrder(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const orderDetails = {
        product: selectedProduct,
        customer: {
            name: formData.get('name'),
            tel: formData.get('tel'),
            address: formData.get('address'),
            quantity: formData.get('quantity')
        }
    };
    
    // แสดงผลลัพธ์การสั่งซื้อ
    alert(`สั่งซื้อสำเร็จ!\n
        รายละเอียดการสั่งซื้อ:
        สินค้า: ${orderDetails.product.name}
        จำนวน: ${orderDetails.customer.quantity} คู่
        ยอดรวม: ${orderDetails.product.price * orderDetails.customer.quantity} บาท
        ชื่อผู้รับ: ${orderDetails.customer.name}
        เบอร์โทร: ${orderDetails.customer.tel}
        ที่อยู่จัดส่ง: ${orderDetails.customer.address}`);
    
    closeOrderForm();
    event.target.reset();
}

// เพิ่ม Event listener ให้ปุ่มสั่งซื้อทั้งหมด
document.querySelectorAll('.product button').forEach(button => {
    button.addEventListener('click', () => {
        const product = button.closest('.product');
        const productName = product.querySelector('h3').textContent;
        const productPrice = parseInt(product.querySelector('.price').textContent.replace(/[^\d]/g, ''));
        showOrderForm(productName, productPrice);
    });
});