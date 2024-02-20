import { LinearProgress } from "@mui/material"
import { useForm } from "react-hooks-helper"

const Periodic = () => {
    const [formData, setForm] = useForm({
        day: '',
        moth: '',
        year: '',
        dayb: '',
        mothb: '',
        yearb: ''
    })

    const { day, moth, year, dayb, mothb, yearb } = formData

    const days = [1, 2, 3, 4, 5, 6, 8, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    const moths = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    const years = [2024, 2025, 2026]

    return (
        <div> 
            <div>
                <div class="row">
                    <div class="col-sm-1-12" style={{ marginRight: '5px' }}>
                        <div class="card">
                            <p style={{ fontSize: '12px', margin: '5px', fontWeight: 'bold', textAlign: 'center' }}>Data limite A</p>
                            <div class="card-body">
                                <div class="form-group">
                                    <select name="day" value={day} onChange={setForm} id="input" class="form-control" style={{ width: '123px' }}>
                                        <option value="">- Dia -</option>
                                        {days.map((el, i) => (<option value={`${el}`}>{el}</option>))}
                                    </select>
                                    <select name="moth" value={moth} onChange={setForm} id="input" class="form-control" style={{ width: '123px' }}>
                                        <option value="">- Mês -</option>
                                        {moths.map((el, i) => (<option value={`${i+1}`}>{el}</option>))}
                                    </select>
                                    <select name="year" value={year} onChange={setForm} id="input" class="form-control" style={{ width: '123px' }}>
                                        <option value="">- Ano -</option>
                                        {years.map((el, i) => (<option value={`${el}`}>{el}</option>))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div class="col-xs-1-12">
                        <div class="card">
                            <p style={{ fontSize: '12px', margin: '5px', fontWeight: 'bold', textAlign: 'center' }}>Data limite B</p>
                            <div class="card-body">
                                <div class="form-group">
                                    <select name="dayb" value={dayb} onChange={setForm} id="input" class="form-control" style={{ width: '123px' }}>
                                        <option value="">- Dia -</option>
                                        {days.map((el, i) => (<option value={`${el}`}>{el}</option>))}
                                    </select>
                                    <select name="mothb" value={mothb} onChange={setForm} id="input" class="form-control" style={{ width: '123px' }}>
                                        <option value="">- Mês -</option>
                                        {moths.map((el, i) => (<option value={`${i+1}`}>{el}</option>))}
                                    </select>
                                    <select name="yearb" value={yearb} onChange={setForm} id="input" class="form-control" style={{ width: '123px' }}>
                                        <option value="">- Ano -</option>
                                        {years.map((el, i) => (<option value={`${el}`}>{el}</option>))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div><br></br>
            <button type="button" class="btn btn-info"
            onClick={() => {

                const data = {
                    start: `${day}/${moth}/${year}, 00:00:00`,
                    end: `${dayb}/${mothb}/${yearb}, 23:59:00`,
                }
                alert(data.start)
                alert(data.end)
            }}
            >Obter registos</button>

            <hr></hr>

            <div>
                
            </div>
        </div>)
}
export default Periodic