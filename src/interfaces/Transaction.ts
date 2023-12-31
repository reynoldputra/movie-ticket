export interface StatusType {
  tag: string;
  color: string;
}

interface Transaction {
  uid: string;
  cash: number;
}

export interface TicketTrans extends Transaction {
  validDate: Date;
  paymentMethod? : string;
}

export interface TransHistory extends Transaction {
  date: Date;
  status?: StatusType;
  type: string;
  payment? : {
    status: string;
    id : string 
  }
}
