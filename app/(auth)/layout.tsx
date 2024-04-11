import CarouselAuthLayout from "./_components/carousel-auth-layout"

export interface FormAuthLayoutPorps {
  children: React.ReactNode
  title: string
  desc?: string
  href_title: string
  desc_href: string
}

const FormAuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-12 w-screen h-screen overflow-hidden p-8 md:p-6 bg-background">
      {children}
      <CarouselAuthLayout />
    </div>
  )
}

export default FormAuthLayout
