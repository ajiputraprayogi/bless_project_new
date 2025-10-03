import PricePage from "../components/section/harga"
import StepPage from "../components/section/langkah"
import PriceCard from "../components/slices/priceCard"

export default function PricingPage() {
    return (
        <>
            <PriceCard/>
            <PricePage/>
            <StepPage/>
            <div className="mb-10"></div>
        </>
    )
}