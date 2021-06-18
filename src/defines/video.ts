export interface Video {
  id: string;
  url: string;
  createdAt: string;
  email: string;
  votes: Vote[];
}

export interface Vote {
  id: string;
  email: string;
  status: string;
  createdAt: string;
}
