import Banner from "@/components/Banner"
import { render , screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"

//Mock useRouter
jest.mock('next/navigation', () =>({
    useRouter() {
        return{
            prefetch: () => null
        }
    }
}))

//Mock useSession
jest.mock('next-auth/react', () => ({
    useSession(){
        return { data: null, user: { name:"Tester"}}
    }
}))

describe('Banner', () => {

    const covers = ['1.jpg', '2.jpg', '3.jpg']

    it('should change image when click button', async() =>{
        render(<Banner/>)
        const banner = screen.getByRole('img') as HTMLImageElement;
        for (let i = 0 ; i < covers.length ; i++ ){
            await userEvent.click(banner)
            expect(banner.src).toContain(covers[(i+1) % 3]);
        }
    })
})