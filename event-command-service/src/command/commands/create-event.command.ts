export class CreateEventCommand {
  constructor(
    public readonly name: string,
    public readonly dates: Date[],
    public readonly createdBy: string,
  ) {}
}
