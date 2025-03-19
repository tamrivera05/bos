import OrgChart from './chart/org-chart';

export default function Home() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between py-10 px-8">
        <div className="w-full max-w-7xl">
          <h1 className="text-3xl text-[#1F2937] md:text-6xl font-extrabold text-center mb-4">Barangay Directory</h1>
          <p className="text-muted-foreground text-center mb-8">Meet our dedicated Barangay Officials and Staff members</p>
          <OrgChart />
        </div>
      </main>
    )
  }