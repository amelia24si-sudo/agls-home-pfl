export default function BioData(){ //parent commponet, component utama
    return (
        <div>
            <h1>Pemrograman Framework Lanjutan</h1>
            <p style={{ textAlign: 'center' }}>Selamat Belajar ReactJs</p>
            <Greating/>
                <UserCard
                nama ="Amelia Golisa"
                nim="2457301013"
                tanggal ="12 Agustus 2006"
                alamat="Pekanbaru, Riau"
                hobi="Membaca dan Menggambar"
                prodi="Sistem Informasi"
                kampus ="Politeknik Caltex Riau"/>
            <QuoteText/>
        </div>
    )
}

function Greating(){ // child component, component yang dipanggil di dalam component lain
    return (
        <div>
            <p style={{ textAlign: 'center' }}>Semoga Belajar ReactJs Menyenangkan</p>
        </div>
    )
}

function QuoteText() { //component javascript, component yang berisi logic javascript
    const text = "Truth stands firm, even when noise surrounds it."; 
    const text2 = "— School Assembly Thought for March 18";
    return (
        <div>
            <hr/>
            <p style={{ textAlign: 'center' }}>{text.toUpperCase()}</p>
            <p><small>{text2.toLowerCase()}</small></p>
        </div>
    )
}

function UserCard(props){ // prop component, component yang menerima data dari component lain melalui props
    return (
        <div>
            <hr/>
            <p>Nama: {props.nama}</p>
            <p>NIM: {props.nim}</p>
            <p>Tanggal Lahir: {props.tanggal}</p>
            <p>Alamat: {props.alamat}</p>
            <p>Hobi: {props.hobi}</p>
            <p>Prodi : {props.prodi}</p>
            <p>Kampus: {props.kampus}</p>
        </div>
    )
}