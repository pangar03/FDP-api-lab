const getData = async (url: string) => {
    const data = await fetch(url)
    .then(res => res.json())
    .catch((error) => { 
        console.error("Ha ocurrido un error:", error);
    });

    return data;
};

export default getData;