import style from "./Model.module.css";

import { useState, type ChangeEvent, type FormEvent } from "react";

import Loading from "../../components/loading/Loading";
import Alert from "../../components/alert/Alert";
import DonutChart from "../../components/graphs/Donut";

interface PredictionResponse {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

export default function Model() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Substitua pela URL da sua Function URL ou do seu API Gateway da AWS
  const LAMBDA_URL = import.meta.env.VITE_URL_API;

  // Controla a seleção da imagem e gera um preview visual
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  // Função auxiliar para converter o arquivo em string Base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // O readAsDataURL vem com o prefixo "data:image/jpeg;base64,", precisamos extrair apenas o hash
        const base64String = (reader.result as string).split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!image) {
      setError("Insert image first.");
      setTimeout(() => setError(null), 5000);
      return;
    }

    setLoading(true);

    try {
      // 1. Converte a imagem para Base64
      const base64Image = await convertToBase64(image);

      // 2. Envia para a AWS Lambda conforme a estrutura que o back espera
      const response = await fetch(LAMBDA_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64Image,
        }),
      });

      const data = await response.json();

      if (!response.ok) return;
      
      setResult(data as PredictionResponse);
    } catch (err: any) {
      console.log(err);
      setError("could not find response");
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <Alert type="error" text={error} />}
      {loading && <Loading />}

      <section id={style.model}>
        <div className={style.model__header}>
          <h2>X-ray chest classification</h2>
          <hr />
        </div>
        <div className={style.model__content}>
          <form onSubmit={handleSubmit} className={style.model__content__form}>
            <div className={style.model__content__form_input}>
              <div>
                <p>Select a X-ray chest-file:</p>
                <label htmlFor="file-upload">upload</label>
              </div>
              <input
                style={{ display: "none" }}
                id="file-upload"
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleImageChange}
              />
            </div>
            <div className={style.model__content__form_image}>
              {preview ? (
                <img src={preview} alt="Preview" />
              ) : (
                <p>No image selected</p>
              )}
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Send to analysis"}
            </button>
          </form>
          <div id={style.model__content__result}>
            {result && (
              <DonutChart
                data={result.data}
                color={result.data.map((e) => e.color)}
                fontsize={20}
                title={"X-ray prediction".toUpperCase()}
                titleColor="#212529"
                tooltipBackground="#717a83"
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
