import { useState } from "react";
import useMutation from "../api/useMutation";

export default function ServiceRequestForm() {
  const { mutate, data, loading, error } = useMutation("POST", "/orders", []);
  const [form, setForm] = useState({
    name: "", address: "", phone: "", preferredDropOff: "", notes: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    const ok = await mutate(form);
    if (ok) setForm({ name:"", address:"", phone:"", preferredDropOff:"", notes:"" });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Blade Sharpening Request</h1>
        {data && <p className="mb-4 text-green-700">Request submitted! We'll contact you soon.</p>}
        {error && <p className="mb-4 text-red-700">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {["name","address","phone","preferredDropOff","notes"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
              <input
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="mt-1 block w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required={field !== "notes"}
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
