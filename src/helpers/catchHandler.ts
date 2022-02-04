import { toast } from 'react-toastify';

export const catchHandler = (error: any) => toast.error(error.message);
