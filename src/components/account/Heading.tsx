export default function AccountHeading({ title, body }: {
    title: string,
    body: string
}){
    return <div className="flex flex-col py-4">
        <h1 className="text-center text-2xl text-text-base py-3">{title}</h1>
        <p className="text-center text-text-base/70">{body}</p>
    </div>
}
