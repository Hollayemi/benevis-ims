
"use client";
import Button from "@/components/common/Button/Button";
import FormInput from "@/components/common/FormInput/FormInput";
import { useAuth } from "@/contexts/authContext";
import { API_BASE_URL } from "@/lib/config";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProfileUpdateForm = () => {
  const [name, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [picture, setPicture] = useState(null);
  const [newPicture, setNewPicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { user, ...others } = useAuth();

  const router = useRouter();

  // Initialize form values with session data if available
  useEffect(() => {
    if (user) {
      setStoreName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setPosition(user.position || "");
      setPicture(user.picture || null);
    }
  }, [user]);

  //handle onChange profile picture
  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPicture(URL.createObjectURL(file));
      setNewPicture(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const res = await fetch(
        `${API_BASE_URL}/admin/security/profile`,
        {
          method: "PATCH",
          body: JSON.stringify({
            name,
            phone,
            position,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        },
      );

      const data = await res.json();

      if (data?.data?._id) {
        setLoading(false);
        // Update session data with new profile information
        await update({
          ...others,
          user: {
            ...data?.data,
          },
        });
        router.refresh();
        toast.success("Profile updated successfully");
      } else {
        setLoading(false);
        setErrors(data);
      }
    } catch (err) {
      setLoading(false);
      setErrors({
        errors: {
          common: {
            msg: "Failed to update profile. Please try again",
          },
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-white/10 p-5 shadow-sm shadow-primary backdrop-blur">
        <div className="mb-7 flex w-full items-center justify-center">
          {/* store image */}
          <div className="flex justify-center">
            <label htmlFor="picture">
              <div className="group relative h-full w-full overflow-hidden rounded-xl ring-2 ring-primary transition-all duration-300 ease-linear hover:ring-4">
                <Image
                  src={picture ? picture : "/default.jpg"}
                  width={100}
                  height={100}
                  alt="profile"
                  className="h-28 w-28 cursor-pointer select-none object-cover"
                />
                <p className="absolute bottom-0 hidden h-8 w-full cursor-pointer items-center justify-center bg-gray-500/90 text-white group-hover:flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                </p>
              </div>
            </label>
            <input
              type="file"
              name="picture"
              id="picture"
              className="hidden"
              onChange={handlePictureChange}
              accept="image/*"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="space-y-5">
            <div className="space-y-2">
              <FormInput
                label="Fullname"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setStoreName(e.target.value)}
              />
              <p className="text-sm font-semibold text-red-500">
                {errors?.errors?.name?.msg}
              </p>
            </div>

            <div className="space-y-2">
              <FormInput
                label="Email"
                type="email"
                name="email"
                placeholder="Enter email address"
                disabled
                className="cursor-not-allowed bg-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-sm font-semibold text-red-500">
                {errors?.errors?.email?.msg}
              </p>
            </div>

            <div className="space-y-2">
              <FormInput
                label="phone number"
                type="text"
                name="phone"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <p className="text-sm font-semibold text-red-500">
                {errors?.errors?.phone?.msg}
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <FormInput
              label="Position"
              type="text"
              disabled
              className="cursor-not-allowed bg-gray-300"
              name="position"
              placeholder="Enter position"
              value={position}
            />


          </div>
        </div>
        <br />
        <Button className="w-full" isPending={loading}>
          save
        </Button>
        {errors?.errors?.common && (
          <p className="rounded bg-red-600 py-2 text-center text-sm font-medium text-white">
            {errors?.errors?.common?.msg}
          </p>
        )}
      </div>
    </form>
  );
};

export default ProfileUpdateForm;
