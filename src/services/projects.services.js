// lib/getProject.ts
export async function getProject() {
    const res = await fetch(
        'https://breval-api.lightin.io/api/projets?sort=date%3Adesc&populate=*',
        { cache: 'no-store' }
    )
    const data = await res.json()
    return data.data
}
