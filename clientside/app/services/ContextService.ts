export class ContextService {
  data: any;

  getData() {
    return this.data;
  }
  setData(data: any) {
    this.data = data;
  }
}
