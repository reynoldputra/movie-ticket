export interface StatusType {
  tag: string;
  color: string;
}

interface Transaction {
  uid: string;
  cash: number;
  isIn: boolean;
}

export interface TicketTrans extends Transaction {
  validDate: Date;
}

export interface CompletedTrans extends Transaction {
  date: Date;
  status: StatusType;
  type: string;
}
