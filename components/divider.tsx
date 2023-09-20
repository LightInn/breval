import React from "react";

export function Divider({top}: { top: boolean }) {
    return <section
        className={`relative z-30 flex
      h-[30px] translate-y-[-25px] transform
      snap-start items-center justify-center
       bg-slate-900 drop-shadow-[0px_-10px_1px_-8px_rgba(0,0,0,1)] ${top ? 'rounded-t-full ' : 'rounded-b-full'}`}
    >
        {/* @ts-ignore */}


        {
            top ?
                <hr className="w-[50px] border-slate-800"/>

                :

                // bottom border thin empty arrow  divider
                <svg fill="#fff" height="50px" width="30px" version="1.1" id="Layer_1"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 330 330">
                    <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
                </svg>


        }


    </section>;
}