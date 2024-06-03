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
