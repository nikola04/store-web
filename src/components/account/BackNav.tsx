import { useCallback, useMemo } from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router";

export function BackNav({ defaultOrigin }: {
    defaultOrigin: string
}){
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const origin = useMemo(() => {
        return searchParams.get('origin');
    }, [searchParams]);

    const goBack = useCallback(() => {
        navigate(origin ?? defaultOrigin);
    }, [defaultOrigin, navigate, origin]);

    return <div className="-ml-2 flex rounded-full overflow-clip">
        <button className="p-2 cursor-pointer hover:bg-primary-bg-light active:bg-primary-bg transition-all" onClick={goBack}>
            <MdArrowBack size={21}/>
        </button>
    </div>
}
