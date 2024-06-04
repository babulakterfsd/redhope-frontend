'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'sonner';

const Profile = ({ loggedInUser }: any) => {
  const [showProfileUpdateModal, setShowProfileUpdateModal] =
    useState<boolean>(false);
  const [showProfilePhotoUpdateModal, setShowProfilePhotoUpdateModal] =
    useState<boolean>(false);
  const [showPasswordUpdateModal, setShowPasswordUpdateModal] =
    useState<boolean>(false);
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [userNewName, setUserNewName] = useState<string>('');
  const [userAddress, setUserAddress] = useState<string>('');
  const [userCity, setUserCity] = useState<string>('');
  const [userState, setUserState] = useState<string>('');
  const [userCountry, setUserCountry] = useState<string>('');
  const [userPostalCode, setUserPostalCode] = useState<string>('');
  const [userMobile, setUserMobile] = useState<string>('');
  const [newProfileImage, setNewProfileImage] = useState('' as any);
  const [updateProfilePhotoOngoing, setUpdateProfilePhotoOngoing] =
    useState(false);
  const router = useRouter();
  // handle profile image upload
  const handleProfilePhotoUpload = (e: any) => {
    e.preventDefault();
    setUpdateProfilePhotoOngoing(true);

    const preset_key = 'mzkzsual';
    const cloud_name = 'dzqkcbgew';

    const formData = new FormData();

    if (!newProfileImage) {
      setUpdateProfilePhotoOngoing(false);
      toast.error('Please select an image to upload', {
        position: 'top-right',
        duration: 1500,
      });
      return;
    }

    // check if image size is less than 1MB and type is jpg, jpeg or png
    if (newProfileImage) {
      if (newProfileImage.size > 1024 * 1024) {
        setUpdateProfilePhotoOngoing(false);
        toast.error('Image size should be less than 1MB', {
          position: 'top-right',
          duration: 1500,
        });
        return;
      } else if (
        newProfileImage.type !== 'image/jpeg' &&
        newProfileImage.type !== 'image/jpg' &&
        newProfileImage.type !== 'image/png'
      ) {
        setUpdateProfilePhotoOngoing(false);
        toast.error('We accept only jpg, jpeg and png type images', {
          position: 'top-right',
          duration: 1500,
        });
        return;
      } else {
        formData.append('file', newProfileImage);
        formData.append('upload_preset', preset_key as string);
      }
    }

    fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then(async (data) => {
        const imgSecureUrl =
          (data?.secure_url as string) || loggedInUser?.profileImage;
        const response = await fetch(
          'https://redhope-backend.vercel.app/api/auth/update-profile',
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              profileImage: imgSecureUrl,
              email: loggedInUser?.email,
            }),
          }
        );
        const responseData = await response.json();

        if (responseData?.statusCode === 200) {
          toast.success('Profile photo updated successfully', {
            position: 'top-right',
            duration: 1500,
          });
          setShowProfilePhotoUpdateModal(!showProfilePhotoUpdateModal);
          setUpdateProfilePhotoOngoing(false);
          setNewProfileImage('');
          router.refresh();
        } else {
          toast.error('Profile photo update failed', {
            position: 'top-right',
            duration: 1500,
          });
          setUpdateProfilePhotoOngoing(false);
        }
      })
      .catch(() => {
        toast.error('Image upload failed', {
          position: 'top-right',
          duration: 1500,
        });
        setUpdateProfilePhotoOngoing(false);
      });
  };

  // handle profile  update
  const handleUpdateProfile = async (e: any) => {
    e.preventDefault();
    const isAnyFieldFilled =
      userNewName ||
      userAddress ||
      userCity ||
      userState ||
      userCountry ||
      userPostalCode ||
      userMobile;

    if (!isAnyFieldFilled) {
      toast.error('Whats the update you want to made?', {
        position: 'top-right',
        duration: 1500,
      });
      return;
    } else {
      const response = await fetch(
        'https://redhope-backend.vercel.app/api/auth/update-profile',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: userNewName ? userNewName : loggedInUser?.name,
            email: loggedInUser?.email,
            profileImage: loggedInUser?.profileImage,
            location: {
              address: userAddress
                ? userAddress
                : loggedInUser?.location?.address,
              city: userCity ? userCity : loggedInUser?.location?.city,
              state: userState ? userState : loggedInUser?.location?.state,
              country: userCountry
                ? userCountry
                : loggedInUser?.location?.country,
              postalCode: userPostalCode
                ? userPostalCode
                : loggedInUser?.location?.postalCode,
              mobile: userMobile ? userMobile : loggedInUser?.location?.mobile,
            },
          }),
        }
      );
      const responseData = await response.json();

      if (responseData?.statusCode === 200) {
        toast.success('Profile updated successfully', {
          position: 'top-right',
          duration: 1500,
        });
        setShowProfileUpdateModal(!showProfileUpdateModal);
        setUserNewName('');
        router.refresh();
      } else {
        toast.error('Update failed', {
          position: 'top-right',
          duration: 1500,
        });
      }
    }
  };

  const handleUpdatePassword = async (e: any) => {
    e.preventDefault();

    if (
      loggedInUser?.email === 'babulakterfsd@gmail.com' ||
      loggedInUser?.email === 'xpawal@gmail.com'
    ) {
      toast.error(
        `Any visitor may use this demo account, so you can't change this account's password`,
        {
          position: 'top-right',
          duration: 1500,
          icon: '🔒',
        }
      );
      return;
    }

    if (!currentPassword || !newPassword) {
      toast.error('Please fill all the fields', {
        position: 'top-right',
        duration: 1500,
      });
      return;
    } else if (newPassword !== confirmNewPassword) {
      toast.error('New password does not match with confirm password!', {
        position: 'top-right',
        duration: 1500,
        icon: '🔒',
      });
      return;
    } else {
      const response = await fetch(
        'https://redhope-backend.vercel.app/api/auth/change-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
            useremail: loggedInUser?.email,
          }),
        }
      );
      const responseData = await response.json();

      if (responseData?.statusCode === 200) {
        toast.success('Password updated successfully', {
          position: 'top-right',
          duration: 1500,
        });
        setShowPasswordUpdateModal(!showPasswordUpdateModal);
        setCurrentPassword('');
        setNewPassword('');
      } else {
        toast.error(responseData?.message, {
          position: 'top-right',
          duration: 1500,
          icon: '🔒',
        });
      }
    }
  };

  const toggleShowingCurrentPassword = () => {
    const passwordInput = document.getElementById(
      'currentpassword'
    ) as HTMLInputElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      setIsCurrentPasswordVisible(true);
    } else {
      passwordInput.type = 'password';
      setIsCurrentPasswordVisible(false);
    }
  };
  const toggleShowingNewPassword = () => {
    const passwordInput = document.getElementById(
      'newpassword'
    ) as HTMLInputElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      setIsNewPasswordVisible(true);
    } else {
      passwordInput.type = 'password';
      setIsNewPasswordVisible(false);
    }
  };

  return (
    <div>
      <h3 className="text-center mt-10 lg:mt-14 text-2xl">
        Profile Management
      </h3>
      <p className="text-center lg:mt-2 md:text-md lg:w-2/3 lg:mx-auto">
        In this section, you can manage your profile, update information and can
        change your password. In the next update, more amazing features will be
        added.
      </p>
      <div className="mt-16 md:mt-20 lg:mt-24">
        <div className="w-11/12 md:w-10/12 lg:w-5/12 mx-auto py-5 px-3 shadow-md rounded-md flex flex-col justify-center items-center relative">
          {
            <>
              <div className="absolute left-0 top-0 bg-orange py-0.5 rounded text-center text-red-400 border border-gray-200 px-2  font-semibold">
                {loggedInUser?.role}
              </div>
              <Image
                src={loggedInUser?.profileImage}
                alt={loggedInUser?.name}
                width={80}
                height={80}
                className="h-20 w-20 rounded-full object-cover"
              />
              <h3 className="text-md font-semibold mt-4">
                {loggedInUser?.name}
              </h3>
              <h3 className="text-sm mt-4">{loggedInUser?.email}</h3>
              <h3 className="text-sm mt-0.5">
                {loggedInUser?.location?.mobile}
              </h3>
              <div className="text-sm mt-4 text-center">
                <span>{loggedInUser?.location?.address}</span>
                {','}
                <span>{loggedInUser?.location?.postalCode}</span> <br />
                <span>
                  {loggedInUser?.location?.city}
                  {','}
                  {loggedInUser?.location?.state}
                  {','}
                  {loggedInUser?.location?.country}
                </span>
              </div>
            </>
          }
          <div
            className="absolute top-2 right-10 text-md text-red-300 hover:text-red-400 duration-300 transition-all ease-in-out cursor-pointer"
            title="Update Account"
          >
            <DropdownMenu>
              <DropdownMenuTrigger>
                <CiEdit style={{ fontSize: '24px', fontWeight: 'bold' }} />
              </DropdownMenuTrigger>
              <DropdownMenuContent style={{ background: 'white' }}>
                <DropdownMenuItem>
                  <button
                    onClick={() => setShowProfileUpdateModal(true)}
                    className="text-md hover:text-red-300 transition-all duration-300 ease-out cursor-pointer"
                  >
                    Update Profile
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={() => setShowProfilePhotoUpdateModal(true)}
                    className="text-md hover:text-red-300 transition-all duration-300 ease-out cursor-pointer"
                  >
                    Update Profile Photo
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={() => setShowPasswordUpdateModal(true)}
                    className="text-md hover:text-red-300 transition-all duration-300 ease-out cursor-pointer"
                  >
                    Update Password
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* profile update modal */}
          <div>
            {showProfileUpdateModal ? (
              <>
                <div
                  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                  data-aos="zoom-in"
                  data-aos-duration="500"
                >
                  <div className="relative w-[370px] lg:w-[640px] my-6 mx-auto">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-md font-semibold text-center">
                          {`Update - ${loggedInUser?.name}`}
                        </h3>
                        <button
                          className="text-2xl text-red-300 hover:text-red-700 hover:transition-all duration-300 ease-in-out"
                          onClick={() => setShowProfileUpdateModal(false)}
                        >
                          <RxCross2 />
                        </button>
                      </div>
                      {/*body*/}
                      <form className="py-6 px-10">
                        <div className="grid gap-4 grid-cols-2 sm:gap-x-6 sm:gap-y-4">
                          {/*  name */}
                          <div className="w-full">
                            <label
                              htmlFor="name"
                              className="block mb-2 text-sm font-medium"
                            >
                              Name
                            </label>

                            <input
                              type="text"
                              name="name"
                              id="name"
                              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600  focus:outline-none"
                              placeholder={`e.g. ${loggedInUser?.name}`}
                              onChange={(e) => setUserNewName(e.target.value)}
                            />
                          </div>
                          {/*  address */}
                          <div className="w-full">
                            <label
                              htmlFor="address"
                              className="block mb-2 text-sm font-medium "
                            >
                              Address
                            </label>

                            <input
                              type="text"
                              name="Address"
                              id="Address"
                              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600  focus:outline-none"
                              placeholder={`e.g. ${loggedInUser?.location?.address}`}
                              onChange={(e) => setUserAddress(e.target.value)}
                            />
                          </div>
                          {/* city */}
                          <div className="w-full">
                            <label
                              htmlFor="city"
                              className="block mb-2 text-sm font-medium "
                            >
                              City
                            </label>

                            <input
                              type="text"
                              name="city"
                              id="city"
                              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600  focus:outline-none"
                              placeholder={`e.g. ${loggedInUser?.location?.city}`}
                              onChange={(e) => setUserCity(e.target.value)}
                            />
                          </div>
                          {/*  state */}
                          <div className="w-full">
                            <label
                              htmlFor="state"
                              className="block mb-2 text-sm font-medium "
                            >
                              State
                            </label>

                            <input
                              type="text"
                              name="state"
                              id="state"
                              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600  focus:outline-none"
                              placeholder={`e.g. ${loggedInUser?.location?.state}`}
                              onChange={(e) => setUserState(e.target.value)}
                            />
                          </div>
                          {/*  country */}
                          <div className="w-full">
                            <label
                              htmlFor="country"
                              className="block mb-2 text-sm font-medium "
                            >
                              Country
                            </label>

                            <input
                              type="text"
                              name="country"
                              id="country"
                              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600  focus:outline-none"
                              placeholder={`e.g. ${loggedInUser?.location?.country}`}
                              onChange={(e) => setUserCountry(e.target.value)}
                            />
                          </div>
                          {/*  postal code */}
                          <div className="w-full">
                            <label
                              htmlFor="postalCode"
                              className="block mb-2 text-sm font-medium "
                            >
                              Postal Code
                            </label>

                            <input
                              type="text"
                              name="postalCode"
                              id="postalCode"
                              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600  focus:outline-none"
                              placeholder={`e.g. ${loggedInUser?.location?.postalCode}`}
                              onChange={(e) =>
                                setUserPostalCode(e.target.value)
                              }
                            />
                          </div>
                          {/*  mobile */}
                          <div className="w-full">
                            <label
                              htmlFor="mobile"
                              className="block mb-2 text-sm font-medium "
                            >
                              Mobile
                            </label>

                            <input
                              type="text"
                              name="mobile"
                              id="mobile"
                              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600  focus:outline-none"
                              placeholder={`e.g. ${loggedInUser?.location?.mobile}`}
                              onChange={(e) => setUserMobile(e.target.value)}
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="bg-red-400 rounded-md px-4 py-2 cursor-pointer text-white hover:bg-red-300 transition-colors duration-300 ease-in-out flex items-center space-x-2 mt-6 ml-auto disabled:cursor-not-allowed disabled:bg-gray-300"
                          onClick={(e) => handleUpdateProfile(e)}
                        >
                          Update Profile
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black transition-all duration-300"></div>
              </>
            ) : null}
          </div>
          {/* profile photo update modal */}
          <div>
            {showProfilePhotoUpdateModal ? (
              <>
                <div
                  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                  data-aos="zoom-in"
                  data-aos-duration="500"
                >
                  <div className="relative w-[370px] lg:w-[640px] my-6 mx-auto">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-md font-semibold text-center">
                          Update Profile Photo
                        </h3>
                        <button
                          className="text-2xl text-red-300 hover:text-red-700 hover:transition-all duration-300 ease-in-out"
                          onClick={() => setShowProfilePhotoUpdateModal(false)}
                        >
                          <RxCross2 />
                        </button>
                      </div>
                      {/*body*/}
                      <form className="py-6 px-10">
                        <div className="grid gap-4 grid-cols-1 sm:gap-x-6 sm:gap-y-4">
                          {/* profile image */}
                          <div className="w-full">
                            <label
                              htmlFor="profileimage"
                              className="block mb-2 text-sm font-medium "
                            >
                              Profile Photo
                            </label>

                            <input
                              type="file"
                              name="profileimage"
                              id="profileimage"
                              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600  focus:outline-none"
                              required
                              onChange={(e) => {
                                const selectedFile =
                                  e.target.files && e.target.files[0];
                                if (selectedFile) {
                                  setNewProfileImage(selectedFile);
                                }
                              }}
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="bg-red-300 rounded-md px-4 py-2 cursor-pointer text-white hover:bg-red-400 transition-colors duration-300 ease-in-out flex items-center space-x-2 mt-6 ml-auto disabled:cursor-not-allowed disabled:bg-gray-300"
                          onClick={(e) => handleProfilePhotoUpload(e)}
                          disabled={updateProfilePhotoOngoing}
                        >
                          {updateProfilePhotoOngoing
                            ? 'Updating Profile'
                            : 'Update Profile Image'}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black transition-all duration-300"></div>
              </>
            ) : null}
          </div>
          {/* password update modal */}
          <div>
            {showPasswordUpdateModal ? (
              <>
                <div
                  className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                  data-aos="zoom-in"
                  data-aos-duration="500"
                >
                  <div className="relative w-[370px] lg:w-[640px] my-6 mx-auto">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-md font-semibold text-center">
                          Update Password
                        </h3>
                        <button
                          className="text-2xl text-red-300 hover:text-red-700 hover:transition-all duration-300 ease-in-out"
                          onClick={() => setShowPasswordUpdateModal(false)}
                        >
                          <RxCross2 />
                        </button>
                      </div>
                      {/*body*/}
                      <form className="py-6 px-10">
                        <div className="grid gap-4 grid-cols-1 sm:gap-x-6 sm:gap-y-4">
                          {/*  current password */}
                          <div className="w-full relative">
                            <label
                              htmlFor="currentpassword"
                              className="block mb-2 text-sm font-medium "
                            >
                              Current Password
                            </label>

                            <input
                              type="password"
                              name="currentpassword"
                              id="currentpassword"
                              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600  focus:outline-none"
                              placeholder="e.g. awal123"
                              required
                              onChange={(e) =>
                                setCurrentPassword(e.target.value)
                              }
                            />
                          </div>
                          {/* new password */}
                          <div className="w-full relative">
                            <label
                              htmlFor="newpassword"
                              className="block mb-2 text-sm font-medium"
                            >
                              New Password
                            </label>

                            <input
                              type="password"
                              name="newpassword"
                              id="newpassword"
                              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600  focus:outline-none"
                              placeholder="e.g. newpassword123"
                              required
                              onChange={(e) => setNewPassword(e.target.value)}
                            />
                          </div>
                          {/* confirm new password */}
                          <div className="w-full relative">
                            <label
                              htmlFor="cnewpassword"
                              className="block mb-2 text-sm font-medium"
                            >
                              Confirm Password
                            </label>

                            <input
                              type="password"
                              name="cnewpassword"
                              id="cnewpassword"
                              className="text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600  focus:outline-none"
                              placeholder="e.g. newpassword123"
                              required
                              onChange={(e) =>
                                setConfirmNewPassword(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="bg-red-300 rounded-md px-4 py-2 cursor-pointer text-white hover:bg-red-400 transition-colors duration-300 ease-in-out flex items-center space-x-2 mt-6 ml-auto"
                          onClick={(e) => handleUpdatePassword(e)}
                        >
                          Update Password
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black transition-all duration-300"></div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
