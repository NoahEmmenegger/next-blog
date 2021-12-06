import Link from "next/link"

export default function Auth({onclick}) {
    let email = ''
    let pass = ''

    return (
        <div className="flex flex-col">
            <Link href="/">Back</Link>
            <div className="m-1">
                <p>Email</p>
                <input type="email" className="border-2" onChange={e => {
                    email = e.target.value
                }}/>
            </div>
            <div className="m-1">
                <p>Password</p>
                <input type="password" className="border-2" onChange={e => {
                    pass = e.target.value
                }}/>
            </div>
            
            <input className="m-1 btn" type="submit" onClick={() => {onclick({email, pass})}} />
        </div>
    )
}