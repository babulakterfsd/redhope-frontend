import { StaticImageData } from 'next/image';

export type TCredentials = {
  email: string;
  password: string;
};

export type TCoreTeamMemberOption = {
  id: number;
  img: StaticImageData;
  name: string;
  position: string;
  donated: number;
};

export type TDonor = {
  _id: string;
  name: string;
  username: string;
  email: string;
  isAvailableToDonate: boolean;
  bloodGroup: string;
  profileImage: string;
  isAccountActive: boolean;
  role: 'admin' | 'donor';
  location?: {
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    mobile?: string;
  };
};

export type TSuccessStory = {
  id: number;
  reviewer: string;
  review: string;
};

export type TCustomSession = {
  name: string;
  email: string;
  image: string;
  token: string;
};

export type TBloodRequest = {
  _id: string;
  requester: {
    name: string;
    username: string;
    email: string;
    isAccountActive: boolean;
    location?: {
      address?: string;
      city?: string;
      state?: string;
      country?: string;
      postalCode?: string;
      mobile?: string;
    };
  };
  donationInfo: {
    hospitalName: string;
    hospitalAddress: string;
    donationDate: string;
    reasonForDonation: string;
  };
  donor: {
    name: string;
    username: string;
    email: string;
    isAvailableToDonate: boolean;
    bloodGroup: string;
    isAccountActive: boolean;
    location?: {
      address?: string;
      city?: string;
      state?: string;
      country?: string;
      postalCode?: string;
      mobile?: string;
    };
  };
  agreeToTermsAndConditions: boolean;
  requestStatus: 'pending' | 'accepted' | 'rejected';
};
