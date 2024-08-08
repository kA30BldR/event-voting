export class CreateVoteEventCommand {
  constructor(
    public readonly userId: string,
    public readonly dateId: string,
    public readonly eventId: string,
  ) {}
}
