const fs = require('fs');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

rl.question('Siapa Nama Anda? ', (nama) => {
    rl.question('Apa yang anda pikirkan tentang NodeJS? ', (jawaban) => {
        const respon = {
            nama: nama,
            jawaban: jawaban
        };

        // Cek jika file ada atau kosong
        let responder = [];
        try {
            const file = fs.readFileSync('responnodejs.json', 'utf-8');
            // Jika file tidak kosong, parse JSON
            if (file) {
                responder = JSON.parse(file);
            }
        } catch (err) {
            console.error("Ralat membaca fail:", err.message);
        }

        // Tambah respon baru ke array
        responder.push(respon);

        // Simpan kembali ke fail
        try {
            fs.writeFileSync('responnodejs.json', JSON.stringify(responder, null, 2)); // Dengan indentasi 2 ruang
            console.log(`Terima kasih ${nama} atas respon anda`);
        } catch (err) {
            console.error("Ralat menulis ke fail:", err.message);
        }

        rl.close();
    });
});