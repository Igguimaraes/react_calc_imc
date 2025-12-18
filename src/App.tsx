import { useState } from "react";
import styles from "./app.module.css";
// import powerImage from "./assets/powered.png";
import leftarrowImage from "./assets/leftarrow.png";
import { levels, calculateImc, Level } from "./helpers/imc";
import { GridItem } from "./components/GridItem";
const App = () => {
  const [hightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toshow, setToShow] = useState<Level | null>(null);

  const handleCalculateButton = () => {
    if (hightField && weightField) {
      setToShow(calculateImc(hightField, weightField));
    } else {
      alert(" Preencha todos os campos");
    }
  };

  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  };

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <h1>IMC</h1>
          <p>Powered by IgorGuimarães</p>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>
            IMC é a sigla para Índice de Massa Copórea, parâmetro adotado pela
            Organização Mundial de Saúde para calcular o peso ideal de cada
            pessoa.
          </p>
          <input
            placeholder="Digite sua Altura. Ex 1.5 (em métros)"
            type="number"
            value={hightField > 0 ? hightField : ""}
            onChange={(e) => setHeightField(parseFloat(e.target.value))}
            disabled={toshow ? true : false}
          />
          <input
            placeholder="digite o seu peso. Ex 50 (em Kg)"
            type="number"
            value={weightField > 0 ? weightField : ""}
            onChange={(e) => setWeightField(parseFloat(e.target.value))}
            disabled={toshow ? true : false}
          />

          <button
            onClick={handleCalculateButton}
            disabled={toshow ? true : false}
          >
            Calcular
          </button>
        </div>
        <div className={styles.rightSide}>
          {!toshow && (
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item} />
              ))}
            </div>
          )}
          {toshow && (
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftarrowImage} alt="" width={25} />
              </div>
              <GridItem item={toshow} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
