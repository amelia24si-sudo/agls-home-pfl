export default function Container({children}){ //nested component, component yang digunakan untuk membungkus component lain 
    return(
        <div>
            <h1>Biodata</h1>
                {children}
        <hr/>  
            <footer>
                <p>2025 - Politeknik Caltex Riau</p>
            </footer>
        </div>
    )
}