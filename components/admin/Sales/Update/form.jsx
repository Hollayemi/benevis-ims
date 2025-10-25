"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSale, updateSale } from "@/actions/storeAdmin/sales/salesActions";
import Container from "@/components/common/Container/Container";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import { format } from "date-fns";

const UpdateSale = ({ sale: def }) => {
    const router = useRouter();
    const [sale, setSale] = useState(def);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Form state
    const [formData, setFormData] = useState({
        paymentStatus: "",
        paymentMethod: "",
        discount: "",
        cash: "",
        bank: "",
        due: "",
        customer: {
            name: "",
            email: "",
            phone: "",
            address: ""
        },
        bankInfo: {
            name: "",
            accountNumber: ""
        }
    });

    // useEffect(() => {
    //     const fetchSale = async () => {
    //         try {
    //             const salesId = (await params).id;
    //             const saleData = await getSale(salesId);
    //             setSale(saleData);

    //             if (saleData?.data) {
    //                 setFormData({
    //                     paymentStatus: saleData.data.paymentStatus || "",
    //                     paymentMethod: saleData.data.paymentMethod || "",
    //                     discount: saleData.data.discount || "",
    //                     cash: saleData.data.cash || "",
    //                     bank: saleData.data.bank || "",
    //                     due: saleData.data.due || "",
    //                     customer: {
    //                         name: saleData.data.customer?.name || "",
    //                         email: saleData.data.customer?.email || "",
    //                         phone: saleData.data.customer?.phone || "",
    //                         address: saleData.data.customer?.address || ""
    //                     },
    //                     bankInfo: {
    //                         name: saleData.data.bankInfo?.name || "",
    //                         accountNumber: saleData.data.bankInfo?.accountNumber || ""
    //                     }
    //                 });
    //             }
    //         } catch (err) {
    //             setError("Failed to fetch sale details");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchSale();
    // }, [params]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith("customer.")) {
            const field = name.split(".")[1];
            setFormData(prev => ({
                ...prev,
                customer: {
                    ...prev.customer,
                    [field]: value
                }
            }));
        } else if (name.startsWith("bankInfo.")) {
            const field = name.split(".")[1];
            setFormData(prev => ({
                ...prev,
                bankInfo: {
                    ...prev.bankInfo,
                    [field]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        setError("");
        setSuccess("");

        try {
            const salesId = (await params).id;
            const result = await updateSale(salesId, formData);

            if (result.success) {
                setSuccess("Sale updated successfully");
                setTimeout(() => {
                    router.push("/admin/sales");
                }, 1500);
            } else {
                setError(result.message || "Failed to update sale");
            }
        } catch (err) {
            setError("An error occurred while updating the sale");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <Container>
                <div className="flex justify-center items-center h-64">
                    <p>Loading sale details...</p>
                </div>
            </Container>
        );
    }

    if (!sale) {
        return (
            <Container>
                <div className="flex justify-center items-center h-64">
                    <p>Sale not found</p>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <PageHeader
                headText="Update Sale"
                backButton={true}
                backUrl={`/admin/sales/${(params).id}`}
            />

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="rounded-lg bg-white/50 p-4 shadow-md backdrop-blur">
                <div className="grid grid-cols-1 gap-5 capitalize md:grid-cols-2">
                    <div className="space-y-3">
                        {/* Customer Information */}
                        <div className="space-y-3 rounded shadow shadow-primary p-4">
                            <h3 className="text-lg font-semibold mb-2">Customer Information</h3>

                            <div className="space-y-1">
                                <label className="text-md font-semibold">Customer Name</label>
                                <input
                                    type="text"
                                    name="customer.name"
                                    value={formData.customer.name}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-md font-semibold">Customer Email</label>
                                <input
                                    type="email"
                                    name="customer.email"
                                    value={formData.customer.email}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-md font-semibold">Customer Phone</label>
                                <input
                                    type="text"
                                    name="customer.phone"
                                    value={formData.customer.phone}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-md font-semibold">Customer Address</label>
                                <textarea
                                    name="customer.address"
                                    value={formData.customer.address}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    rows="3"
                                />
                            </div>
                        </div>

                        {/* Bank Information */}
                        <div className="space-y-3 rounded shadow shadow-primary p-4">
                            <h3 className="text-lg font-semibold mb-2">Bank Information</h3>

                            <div className="space-y-1">
                                <label className="text-md font-semibold">Bank Name</label>
                                <input
                                    type="text"
                                    name="bankInfo.name"
                                    value={formData.bankInfo.name}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-md font-semibold">Account Number</label>
                                <input
                                    type="text"
                                    name="bankInfo.accountNumber"
                                    value={formData.bankInfo.accountNumber}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {/* Payment Information */}
                        <div className="space-y-3 rounded shadow shadow-primary p-4">
                            <h3 className="text-lg font-semibold mb-2">Payment Information</h3>

                            <div className="space-y-1">
                                <label className="text-md font-semibold">Transaction ID</label>
                                <p className="text-gray-800 bg-gray-100 p-2 rounded">{sale?.data?.trxid}</p>
                            </div>

                            <div className="space-y-1">
                                <label className="text-md font-semibold">Payment Status</label>
                                <select
                                    name="paymentStatus"
                                    value={formData.paymentStatus}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="partial">Partial</option>
                                    <option value="completed">Completed</option>
                                    <option value="failed">Failed</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-md font-semibold">Payment Method</label>
                                <select
                                    name="paymentMethod"
                                    value={formData.paymentMethod}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="cash">Cash</option>
                                    <option value="bank">Bank Transfer</option>
                                    <option value="mixed">Mixed</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-md font-semibold">Discount Amount (₦)</label>
                                <input
                                    type="number"
                                    name="discount"
                                    value={formData.discount}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    min="0"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-md font-semibold">Sub Total</label>
                                <p className="text-gray-800 bg-gray-100 p-2 rounded">₦{sale?.data?.subTotal}</p>
                            </div>

                            <div className="space-y-1">
                                <label className="text-md font-semibold">Total Price</label>
                                <p className="text-gray-800 bg-gray-100 p-2 rounded">₦{sale?.data?.totalPrice}</p>
                            </div>

                            <div className="space-y-1">
                                <label className="text-md font-semibold">Payment with Cash (₦)</label>
                                <input
                                    type="number"
                                    name="cash"
                                    value={formData.cash}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    min="0"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-md font-semibold">Payment with Bank (₦)</label>
                                <input
                                    type="number"
                                    name="bank"
                                    value={formData.bank}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    min="0"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-md font-semibold">Total Due (₦)</label>
                                <input
                                    type="number"
                                    name="due"
                                    value={formData.due}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Information (Read-only) */}
                <div className="mt-6 rounded shadow shadow-primary p-4">
                    <h3 className="text-lg font-semibold mb-2">Product Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sale?.data?.cart?.map((item) => (
                            <div key={item._id} className="border rounded p-3">
                                <div className="space-y-1">
                                    <h4 className="font-semibold">Product Name</h4>
                                    <p>{item?.product?.name}</p>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-semibold">Price</h4>
                                    <p>₦{item?.price}</p>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-semibold">Quantity</h4>
                                    <p>{item?.qty}</p>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-semibold">Total</h4>
                                    <p>₦{item?.price * item?.qty}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Due Payment History (Read-only) */}
                {sale?.histories?.length > 0 && (
                    <div className="mt-6 rounded shadow shadow-primary p-4">
                        <h3 className="text-lg font-semibold mb-2">Due Payment History</h3>
                        <div className="flex flex-wrap gap-2">
                            {sale.histories.map((history) => (
                                <div
                                    className="rounded bg-secondary p-3 text-center text-white"
                                    key={history._id}
                                >
                                    <p className="">₦{history?.amount}</p>
                                    <p className="">
                                        {format(new Date(history?.paidAt), "dd MMM yyyy")}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Form Actions */}
                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={updating}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50"
                    >
                        {updating ? "Updating..." : "Update Sale"}
                    </button>
                </div>
            </form>
        </Container>
    );
};

export default UpdateSale;