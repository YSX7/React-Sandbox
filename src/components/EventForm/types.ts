export interface InvalidEvent {
  guest: boolean;
  date: boolean;
  description: boolean;

  isInvalid: () => boolean;
}

export class InvalidEvent implements InvalidEvent {
  constructor({ guest = false, date = false, description = false }) {
    this.guest = guest;
    this.date = date;
    this.description = description;
  }
  isInvalid = () => {
    return this.date || this.description || this.guest;
  };
}
