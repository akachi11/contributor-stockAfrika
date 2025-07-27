import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getToken } from '../../services/AuthServices'
import { baseAPI } from '../../utils/apiUrls'

type Props = {
    onClose: () => void
}

const ModalKYC: React.FC<Props> = ({ onClose }) => {
    const [formData, setFormData] = useState({
        dob: '',
        gender: '',
        niche: '',
        city: '',
        country: '',
        phone_number: '',
        address: '',
        bio: '',
        portfolio_url: '',
        instagram_handle: '',
        twitter_handle: '',
        contract_signed: false,
        available_for_gigs: true,
        agency: '',
        languages: '',
    })

    const [contractFile, setContractFile] = useState<File | null>(null)
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [loading, setLoading] = useState(false)

    const token = getToken()

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        const newValue =
            type === 'checkbox' && e.target instanceof HTMLInputElement
                ? e.target.checked
                : value;

        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: '',
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setContractFile(e.target.files[0])
        }
    }

    const validateFields = () => {
        const requiredFields = [
            'dob',
            'gender',
            'niche',
            'city',
            'country',
            'phone_number',
            'address',
            'bio',
            'languages',
        ]

        const newErrors: { [key: string]: string } = {}

        for (const field of requiredFields) {
            if (!formData[field as keyof typeof formData]?.toString().trim()) {
                newErrors[field] = 'This field is required'
            }
        }

        if (!formData.available_for_gigs) {
            newErrors.available_for_gigs = 'This must be checked'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateFields()) {
            toast.error("Ensure all required fields are filled")
            return
        }

        setLoading(true)

        const data = new FormData()
        for (const key in formData) {
            data.append(key, (formData as any)[key])
        }

        if (contractFile) {
            data.append('contract_file', contractFile)
        }

        try {
            await axios.patch(`${baseAPI}/user/model_kyc/`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token ${token}`
                },
            })

            onClose()
        } catch (err) {
            console.error('Failed to update KYC:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-4 sm:p-6 scrollbar-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black text-lg font-bold"
                    aria-label="Close"
                >
                    ✕
                </button>

                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Model KYC Form</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* DOB */}
                    <div>
                        <label className="block text-sm font-medium">Date of Birth <span className="text-red-500 text-xs">*</span></label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full mt-1 border rounded px-3 py-2 text-sm"
                        />
                        {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-medium">Gender <span className="text-red-500 text-xs">*</span></label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full mt-1 border rounded px-3 py-2 text-sm"
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                    </div>

                    {/* Niche */}
                    <div>
                        <label className="block text-sm font-medium">Niche <span className="text-red-500 text-xs">*</span></label>
                        <input
                            type="text"
                            name="niche"
                            value={formData.niche}
                            onChange={handleChange}
                            className="w-full mt-1 border rounded px-3 py-2 text-sm"
                        />
                        {errors.niche && <p className="text-red-500 text-xs mt-1">{errors.niche}</p>}
                    </div>

                    {/* City & Country */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">City <span className="text-red-500 text-xs">*</span></label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full mt-1 border rounded px-3 py-2 text-sm"
                            />
                            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Country <span className="text-red-500 text-xs">*</span></label>
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full mt-1 border rounded px-3 py-2 text-sm"
                            />
                            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                        </div>
                    </div>

                    {/* Phone Number & Address */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Phone Number <span className="text-red-500 text-xs">*</span></label>
                            <input
                                type="tel"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                className="w-full mt-1 border rounded px-3 py-2 text-sm"
                            />
                            {errors.phone_number && (
                                <p className="text-red-500 text-xs mt-1">{errors.phone_number}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Address <span className="text-red-500 text-xs">*</span></label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full mt-1 border rounded px-3 py-2 text-sm"
                                rows={2}
                            />
                            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                        </div>
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-sm font-medium">Bio <span className="text-red-500 text-xs">*</span></label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="w-full mt-1 border rounded px-3 py-2 text-sm"
                            rows={3}
                        />
                        {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio}</p>}
                    </div>

                    {/* Portfolio URL (Optional) */}
                    <div>
                        <label className="block text-sm font-medium">Portfolio URL</label>
                        <input
                            type="url"
                            name="portfolio_url"
                            value={formData.portfolio_url}
                            onChange={handleChange}
                            className="w-full mt-1 border rounded px-3 py-2 text-sm"
                        />
                    </div>

                    {/* Social Handles */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Instagram Handle</label>
                            <input
                                type="text"
                                name="instagram_handle"
                                value={formData.instagram_handle}
                                onChange={handleChange}
                                className="w-full mt-1 border rounded px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Twitter Handle</label>
                            <input
                                type="text"
                                name="twitter_handle"
                                value={formData.twitter_handle}
                                onChange={handleChange}
                                className="w-full mt-1 border rounded px-3 py-2 text-sm"
                            />
                        </div>
                    </div>

                    {/* Contract Signed */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="contract_signed"
                            name="contract_signed"
                            checked={formData.contract_signed}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <label htmlFor="contract_signed" className="text-sm font-medium">
                            Contract Signed?
                        </label>
                    </div>

                    {/* Upload Contract */}
                    <div>
                        <label className="block text-sm font-medium">Upload Contract File</label>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="w-full mt-1 border rounded px-3 py-2 text-sm"
                        />
                    </div>

                    {/* Available for Gigs */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="available_for_gigs"
                            name="available_for_gigs"
                            checked={formData.available_for_gigs}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <label htmlFor="available_for_gigs" className="text-sm font-medium">
                            Available for Gigs? <span className="text-red-500 text-xs">*</span>
                        </label>
                    </div>
                    {errors.available_for_gigs && (
                        <p className="text-red-500 text-xs">{errors.available_for_gigs}</p>
                    )}

                    {/* Agency & Languages */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Agency</label>
                            <input
                                type="text"
                                name="agency"
                                value={formData.agency}
                                onChange={handleChange}
                                className="w-full mt-1 border rounded px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Languages (comma-separated) <span className="text-red-500 text-xs">*</span></label>
                            <input
                                type="text"
                                name="languages"
                                value={formData.languages}
                                onChange={handleChange}
                                className="w-full mt-1 border rounded px-3 py-2 text-sm"
                            />
                            {errors.languages && (
                                <p className="text-red-500 text-xs mt-1">{errors.languages}</p>
                            )}
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="text-right pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-black text-white px-6 py-2 rounded hover:bg-opacity-90 transition text-sm"
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalKYC
