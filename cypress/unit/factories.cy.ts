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
    const routeShape = StmFactory.createRouteShape(testShape);
    expect(routeShape?.id).to.be.equal(11071);
    expect(routeShape?.coordinates.length).to.equal(27);
  });
});

const testShape = JSON.parse(JSON.stringify(
    {"response":[
        {"shape_id":11071,"shape_pt_lat":45.446466,"shape_pt_lon":-73.603118,"shape_pt_sequence":10001},
        {"shape_id":11071,"shape_pt_lat":45.451158,"shape_pt_lon":-73.593242,"shape_pt_sequence":10002},
        {"shape_id":11071,"shape_pt_lat":45.45701,"shape_pt_lon":-73.581691,"shape_pt_sequence":20002},
        {"shape_id":11071,"shape_pt_lat":45.459441,"shape_pt_lon":-73.572021,"shape_pt_sequence":30002},
        {"shape_id":11071,"shape_pt_lat":45.461894,"shape_pt_lon":-73.567074,"shape_pt_sequence":40002},
        {"shape_id":11071,"shape_pt_lat":45.471063,"shape_pt_lon":-73.566267,"shape_pt_sequence":50002},
        {"shape_id":11071,"shape_pt_lat":45.478465,"shape_pt_lon":-73.569336,"shape_pt_sequence":60002},
        {"shape_id":11071,"shape_pt_lat":45.482509,"shape_pt_lon":-73.58018,"shape_pt_sequence":70002},
        {"shape_id":11071,"shape_pt_lat":45.490068,"shape_pt_lon":-73.585812,"shape_pt_sequence":80002},
        {"shape_id":11071,"shape_pt_lat":45.49557,"shape_pt_lon":-73.57931,"shape_pt_sequence":90002},
        {"shape_id":11071,"shape_pt_lat":45.500879,"shape_pt_lon":-73.574715,"shape_pt_sequence":100002},
        {"shape_id":11071,"shape_pt_lat":45.504064,"shape_pt_lon":-73.571586,"shape_pt_sequence":110002},
        {"shape_id":11071,"shape_pt_lat":45.50822,"shape_pt_lon":-73.568433,"shape_pt_sequence":120002},
        {"shape_id":11071,"shape_pt_lat":45.511033,"shape_pt_lon":-73.564899,"shape_pt_sequence":130002},
        {"shape_id":11071,"shape_pt_lat":45.515226,"shape_pt_lon":-73.561082,"shape_pt_sequence":140002},
        {"shape_id":11071,"shape_pt_lat":45.518831,"shape_pt_lon":-73.555837,"shape_pt_sequence":150002},
        {"shape_id":11071,"shape_pt_lat":45.523988,"shape_pt_lon":-73.552703,"shape_pt_sequence":160002},
        {"shape_id":11071,"shape_pt_lat":45.533504,"shape_pt_lon":-73.552196,"shape_pt_sequence":170002},
        {"shape_id":11071,"shape_pt_lat":45.541717,"shape_pt_lon":-73.554192,"shape_pt_sequence":180002},
        {"shape_id":11071,"shape_pt_lat":45.546832,"shape_pt_lon":-73.551391,"shape_pt_sequence":190002},
        {"shape_id":11071,"shape_pt_lat":45.553688,"shape_pt_lon":-73.551757,"shape_pt_sequence":200002},
        {"shape_id":11071,"shape_pt_lat":45.560687,"shape_pt_lon":-73.54753,"shape_pt_sequence":210002},
        {"shape_id":11071,"shape_pt_lat":45.569285,"shape_pt_lon":-73.547336,"shape_pt_sequence":220002},
        {"shape_id":11071,"shape_pt_lat":45.576843,"shape_pt_lon":-73.54671,"shape_pt_sequence":230002},
        {"shape_id":11071,"shape_pt_lat":45.582736,"shape_pt_lon":-73.543133,"shape_pt_sequence":240002},
        {"shape_id":11071,"shape_pt_lat":45.589431,"shape_pt_lon":-73.539269,"shape_pt_sequence":250002},
        {"shape_id":11071,"shape_pt_lat":45.596572,"shape_pt_lon":-73.535376,"shape_pt_sequence":260002}
    ]}
));