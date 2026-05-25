import { useState, type ChangeEvent, type FormEvent } from "react";

interface PredictionResponse {
  classe_predita: number;
  probabilidades: number[];
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
      setError("Por favor, selecione uma imagem primeiro.");
      return;
    }

    setLoading(true);
    setError(null);

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

      if (!response.ok) {
        throw new Error(data.error || "Erro ao processar a imagem na AWS.");
      }

      // 3. Salva o resultado retornado pela Lambda
      setResult(data as PredictionResponse);
    } catch (err: any) {
      setError(err.message || "Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "sans-serif",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>Classificador de Raio-X</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="file-upload"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Selecione a imagem do Raio-X:
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleImageChange}
          />
        </div>

        {preview && (
          <div style={{ marginBottom: "15px" }}>
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "100%",
                maxHeight: "300px",
                objectFit: "contain",
                borderRadius: "4px",
              }}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: loading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
          }}
        >
          {loading ? "Processando Inferência..." : "Enviar para Análise"}
        </button>
      </form>

      {error && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#f8d7da",
            color: "#721c24",
            borderRadius: "4px",
          }}
        >
          <strong>Erro:</strong> {error}
        </div>
      )}

      {result && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#d4edda",
            color: "#155724",
            borderRadius: "4px",
          }}
        >
          <h3>Resultado da Análise:</h3>
          <p>
            <strong>Classe Predita:</strong>{" "}
            {result.classe_predita === 0
              ? "Normal (0)"
              : "Pneumonia / Alteração (1)"}
          </p>
          <p>
            <strong>Probabilidades:</strong>
          </p>
          <ul>
            {result.probabilidades.map((prob, idx) => (
              <li key={idx}>
                Classe {idx}: {(prob * 100).toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
