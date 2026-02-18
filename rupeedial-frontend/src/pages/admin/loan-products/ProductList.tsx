import { useEffect, useState } from "react";

interface LoanProduct {
  id: number;
  product_name: string;
  product_code: string;
  bank_nbfc_name: string;
  interest_rate: number;
  status: "active" | "paused";
  created_at: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<LoanProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "https://yourdomain.com/api/loan-products"
      );
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id: number, status: string) => {
    try {
      await fetch(
        `https://yourdomain.com/api/loan-products/${id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: status === "active" ? "paused" : "active",
          }),
        }
      );
      fetchProducts();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <p className="p-6">Loading products...</p>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">
          Loan Products
        </h1>

        <a
          href="/dashboard/admin/loan-products/create"
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          + Add Product
        </a>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Bank / NBFC</th>
              <th className="px-4 py-3">Interest</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  <div className="font-medium">
                    {p.product_name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {p.product_code}
                  </div>
                </td>

                <td className="px-4 py-3">
                  {p.bank_nbfc_name}
                </td>

                <td className="px-4 py-3">
                  {p.interest_rate}%
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      p.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {p.status.toUpperCase()}
                  </span>
                </td>

                <td className="px-4 py-3">
                  {new Date(p.created_at).toLocaleDateString()}
                </td>

                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() =>
                      toggleStatus(p.id, p.status)
                    }
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {p.status === "active"
                      ? "Pause"
                      : "Activate"}
                  </button>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No loan products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
