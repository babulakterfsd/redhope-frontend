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
