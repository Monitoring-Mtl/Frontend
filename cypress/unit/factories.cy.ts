import { StmFactory } from "@/factories/StmFactory";

describe("Test the creation of data objects from received JSON", () => {

  it("Create bus data test.", () => {
      const busData = StmFactory.createBusData(JSON.parse("{}"))!;
      expect(busData?.length).to.equal(100);

      const sampleBus = busData[0];
      expect(sampleBus.occupancy).to.be.above(-1);
      expect(sampleBus.occupancy).to.be.below(5);
      expect(sampleBus.punctuality).to.be.above(-3601);
      expect(sampleBus.punctuality).to.be.below(3601);
  });

  it("Create ramp access schedule test.", () => {
    const rampAccessSchedules = StmFactory.createRampAccessSchedule(JSON.parse("{}"))!;
    expect(rampAccessSchedules?.length).to.equal(50);

    const firstSchedule = rampAccessSchedules[0].date;
    const lastSchedule = rampAccessSchedules[49].date;
    expect(firstSchedule.getTime()).to.be.below(lastSchedule.getTime());
  });

  it("Create route shape test.", () => {
    const routeShape = StmFactory.createRouteShape(JSON.parse("{}"));
    expect(routeShape?.id).to.be.equal(11071);
    expect(routeShape?.coordinates.length).to.equal(27);
  });

  it("Create stops test.", () => {
    const stops = StmFactory.createStops(JSON.parse("{}"));
    expect(stops?.length).to.equal(27);
  });
})