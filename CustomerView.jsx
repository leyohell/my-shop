// واجهة الزبون
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function CustomerView() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(saved);
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  const submitOrder = () => {
    const order = { name, phone, location, cart, status: "في انتظار موافقة المشرف" };
    const saved = JSON.parse(localStorage.getItem("orders") || "[]");
    saved.push(order);
    localStorage.setItem("orders", JSON.stringify(saved));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold">تم إرسال الطلب</h2>
        <p>في انتظار الموافقة من المشرف وسوف يتواصل معك المندوب في أقرب وقت</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">المنتجات</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <div key={index} className="border p-4 rounded shadow space-y-2">
            <img src={product.image} className="w-full h-40 object-cover rounded" />
            <div><strong>الاسم:</strong> {product.name}</div>
            <div><strong>السعر:</strong> {product.price} د.ل</div>
            <div><strong>اللون:</strong> {product.color}</div>
            <div><strong>المقاس:</strong> {product.size}</div>
            <div><strong>التوصيل:</strong> {product.shipping} د.ل</div>
            <Button onClick={() => addToCart(product)}>➕ إضافة للسلة</Button>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mt-8">السلة</h2>
      <div className="space-y-2">
        {cart.map((item, index) => (
          <div key={index} className="border p-2 rounded flex items-center justify-between">
            <span>{item.name}</span>
            <Button variant="destructive" onClick={() => removeFromCart(index)}>حذف</Button>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold mt-6">معلومات الزبون</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="اسمك"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="tel"
          placeholder="رقم الهاتف (10 أرقام)"
          maxLength={10}
          className="border p-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="موقعك (Google Maps)"
          className="border p-2 rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <Button className="bg-green-600 hover:bg-green-700 mt-4" onClick={submitOrder}>تأكيد الطلب</Button>
    </div>
  );
}
