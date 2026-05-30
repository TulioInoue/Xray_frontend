import style from "./About.module.css";

export default function About() {
  return (
    <section id={style.about}>
      <div className={style.about__header}>
        <h2>About</h2>
        <hr />
      </div>
      <div>
        <h3>Summary</h3>
        <p>
          By utilizing a public clinical dataset from{" "}
          <a
            href="https://www.kaggle.com/datasets/tawsifurrahman/covid19-radiography-database"
            target="_blank"
          >
            Kaggle
          </a>
          , implementing rigorous data engineering preprocessing pipelines, and
          deploying the final model via an entirely{" "}
          <strong>serverless AWS infrastructure</strong>, this application
          delivers real-time, low-latency predictions with zero infrastructure
          overhead costs when idle.
        </p>
      </div>
      <div>
        <h3>Dataset and Clinical Context</h3>
        <p>
          The foundational backbone of this predictive system is the{" "}
          <strong>COVID-19 Radiography Database</strong>, sourced from the{" "}
          <a
            href="https://www.kaggle.com/datasets/tawsifurrahman/covid19-radiography-database"
            target="_blank"
          >
            Kaggle
          </a>{" "}
          repository. The dataset contains clinical x-ray images from patients
          suffering from 4 differents classes:
        </p>
        <div>
          <img src="/images/diagnosis.png" alt="x-ray classes" />
        </div>
        <p>The dataset also offers all kinds of masks for each chest X-ray:</p>
        <div>
          <img src="/images/masks.png" alt="masks" />
        </div>
        <div>
          <h4>Feature Inventory</h4>
          <p>
            The model evaluates images and evaluates 4 differents diagnosis:
          </p>
          <ul>
            <li>
              <p>
                <strong>Covid:</strong> it spreads primarily through the air via
                respiratory droplets and aerosols when infected people cough,
                sneeze, talk, or breathe.
              </p>
            </li>
            <li>
              <p>
                <strong>Lung Opacity:</strong> is a radiological term used to
                describe any area in the lung that appears whiter, hazy, or
                cloudy on an X-ray or CT scan.
              </p>
            </li>
            <li>
              <p>
                <strong>Normal:</strong> an healthy example of a chest X-ray.
              </p>
            </li>
            <li>
              <p>
                <strong>Viral Pneumonia:</strong> an infection that inflames the
                air sacs in one or both lungs, causing them to fill with fluid
                or pus.
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h3>About the model</h3>
        <p>
          We have tested differents <code>tensors</code> architetures, and we
          have decided that <code>EfficientNetB2</code> was light and strong
          enough to create great results maintaining low costs.
        </p>
        <div>
          <h4>Serverless Cloud Infrastructure on AWS</h4>
          <p>
            To host this model cost-effectively without managing continuous
            virtual machines, the entire inference engine was designed around a{" "}
            <strong>Serverless Architecture on Amazon Web Services</strong> (
            <a
              href="https://aws.amazon.com/pt/free/?trk=4f374c9d-ac11-490d-8b23-82df6d4e054b&sc_channel=ps&trk=4f374c9d-ac11-490d-8b23-82df6d4e054b&sc_channel=ps&ef_id=Cj0KCQjwiJvQBhCYARIsAMjts3Ihzx82Wm33e-d05WRh7novQqDCOUTIBW-jtg7Os5A3apSCXBoefVIaAtjSEALw_wcB:G:s&s_kwcid=AL!4422!3!795841170154!e!!g!!aws!23528572733!191423953134&gad_campaignid=23528572733&gbraid=0AAAAADjHtp-JiJM_hnvAOlwZmxOmDfeB1&gclid=Cj0KCQjwiJvQBhCYARIsAMjts3Ihzx82Wm33e-d05WRh7novQqDCOUTIBW-jtg7Os5A3apSCXBoefVIaAtjSEALw_wcB"
              target="_blank"
            >
              AWS
            </a>
            ).
          </p>
        </div>
        <div>
          <h4>Production API Gateway Integration</h4>
          <p>
            An Amazon <strong>API Gateway</strong> was configured as a REST API
            layer to act as the secure, public portal to the underlying Lambda
            inference function. This was possible because of a HTTP POST Method
            dedicated to the endpoint <code>/predict</code>, protected by{" "}
            <strong>CORS</strong>.
          </p>
        </div>
      </div>
      <div>
        <h3>Frontend configuration</h3>
        <div>
          <h4>Architeture: React, Vite and Typescript</h4>
          <p>
            The client-facing layer is an intuitive, modern single-page
            application built using the <strong>React</strong> ecosystem,
            scaffolded with <strong>Vite</strong> for optimized build times, and
            enforced with strict <strong>TypeScript</strong> typings.
          </p>
        </div>
        <div>
          <h4>Cloud Deployment</h4>
          <p>
            The final production build of the frontend was bundled into a{" "}
            <code>/dist</code> folder and save it in{" "}
            <strong>Amazon S3 Static Website Hosting</strong>.
          </p>
          <p>
            By decoupling the frontend hosting (<strong>S3</strong>) from the
            compute engine (<strong>Lambda</strong>), the entire platform scales
            automatically from a few users to millions of concurrent requests
            without configuring auto-scaling groups, load balancers, or patching
            underlying OS kernels.
          </p>
        </div>
      </div>
      <div>
        <h3>Conclusion</h3>
        <p>
          By treating preprocessing, model selection, infrastructure
          optimization, and frontend design as a unified, cohesive delivery
          pipeline, this application serves as a benchmark for deploying
          high-performance, cost-effective, and secure healthcare analytics
          tools on the modern cloud.
        </p>
      </div>
    </section>
  );
}
