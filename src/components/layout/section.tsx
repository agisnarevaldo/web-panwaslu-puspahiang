import React from "react";
import Header from "@/components/layout/header";

export default function Section({title, description, classname, children}: {
    title: string,
    description: string,
    classname?: string,
    children: React.ReactNode
}) {
    return (
        <section className={`${classname} container my-10 mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
            <Header title={title} description={description}/>
            {children}
        </section>
    )
}