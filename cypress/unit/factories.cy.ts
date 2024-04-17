import { StmFactory } from "@/factories/StmFactory";

describe("Test the creation of data objects from received JSON", () => {

    it("Create route shape test.", () => {
        cy.fixture("shape.json").then((shape) => {
            const routeShape = StmFactory.createRouteShape(shape)!;
            expect(routeShape).not.to.be.null;
            expect(routeShape.id).to.be.equal(11071);
            expect(routeShape.coordinates.length).to.equal(27);
        });
    });

    it("Create STM analysis test.", () => {
        cy.fixture("analysis.json").then((analysis) => {
            const stmAnalysis = StmFactory.createStmAnalysis(analysis, [])!;
            expect(stmAnalysis).not.to.be.null;
            expect(stmAnalysis.offsets.length).to.equal(17);
            expect(stmAnalysis.offsets[0]).to.equal(-229);
            expect(stmAnalysis.accessibilities.length).to.equal(3);
            expect(stmAnalysis.accessibilities[1]).to.equal(8);
            expect(stmAnalysis.occupancies.length).to.equal(3);
            expect(stmAnalysis.occupancies[1]).to.equal(2);
        });
    });
});