import React, { useState, useRef } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";

const PregnancyDiagnosis = () => {
  const [lastPeriod, setLastPeriod] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [pregnancyLikelihood, setPregnancyLikelihood] = useState(0);
  const modalRef = useRef(null); // Reference for modal

  const symptomOptions = [
    "Missed Period",
    "Nausea or Morning Sickness",
    "Tender Breasts",
    "Fatigue",
    "Frequent Urination",
    "Food Cravings or Aversions",
    "Mood Swings",
    "Light Spotting (Implantation Bleeding)",
    "Dizziness or Headaches",
    "Increased Basal Body Temperature",
  ];

  const diagnosePregnancy = () => {
    if (!lastPeriod || symptoms.length === 0) return;

    let score = 0;

    if (symptoms.includes("Missed Period")) score += 3;
    if (symptoms.includes("Nausea or Morning Sickness")) score += 3;
    if (symptoms.includes("Tender Breasts")) score += 2;
    if (symptoms.includes("Fatigue")) score += 2;
    if (symptoms.includes("Frequent Urination")) score += 2;
    if (symptoms.includes("Food Cravings or Aversions")) score += 1;
    if (symptoms.includes("Mood Swings")) score += 1;
    if (symptoms.includes("Light Spotting (Implantation Bleeding)")) score += 3;
    if (symptoms.includes("Dizziness or Headaches")) score += 1;
    if (symptoms.includes("Increased Basal Body Temperature")) score += 2;

    let likelihood = Math.min((score / 15) * 100, 100);
    setPregnancyLikelihood(Math.round(likelihood));
    modalRef.current?.showModal();
  };

  return (
    <div>
      <div className="grid grid-cols-7 py-6 max-w-screen my-4 mb-10">
        <div className="col-start-2 col-span-3">
          <div className="font-bold font-sans text-4xl text-base-content mb-6 text-center">
            Pregnancy Diagnosis Tool
          </div>

          <div className="flex flex-col justify-center items-center gap-6 min-w-[650px] min-h-[150px] bg-transparent rounded-lg p-8 shadow-md">
            <label className="w-11/12 text-base-content font-semibold">
              First Day of Your Last Period:
            </label>
            <input
              type="date"
              value={lastPeriod}
              onChange={(e) => setLastPeriod(e.target.value)}
              className="input input-bordered w-11/12 transition-all duration-200 focus:ring-2 focus:ring-primary"
            />

            <label className="w-11/12 text-base-content font-semibold">
              Select Your Symptoms:
            </label>
            <div className="grid grid-cols-2 gap-2 w-11/12">
              {symptomOptions.map((symptom) => (
                <label key={symptom} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={symptom}
                    onChange={(e) => {
                      const selectedSymptom = e.target.value;
                      setSymptoms((prev) =>
                        prev.includes(selectedSymptom)
                          ? prev.filter((s) => s !== selectedSymptom)
                          : [...prev, selectedSymptom]
                      );
                    }}
                    className="checkbox checkbox-primary"
                  />
                  <span className="text-base-content">{symptom}</span>
                </label>
              ))}
            </div>

            <button
              className="btn btn-primary w-11/12 transition-all duration-200"
              onClick={diagnosePregnancy}
              disabled={!lastPeriod || symptoms.length === 0}
            >
              Diagnose Pregnancy
            </button>
          </div>

          <div className="mt-8 p-6 bg-transparent rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-base-content mb-4">
              How does the pregnancy diagnosis work?
            </h2>
            <p className="text-base-content mb-4">
              This tool estimates your <strong>chances of pregnancy</strong>{" "}
              based on the <strong>first day of your last period</strong> and{" "}
              <strong>common early symptoms</strong>. Keep in mind, this is{" "}
              <strong>not a medical diagnosis</strong>—if you suspect you’re
              pregnant, consider taking a<strong>home pregnancy test</strong> or
              visiting your doctor.
            </p>

            <ul className="space-y-4">
              <li className="border-l-4 border-primary pl-4">
                <h3 className="text-lg font-semibold text-base-content">
                  📅 Missed Period
                </h3>
                <p className="text-base-content">
                  If your period is late and you’ve had unprotected intercourse,
                  pregnancy is a possibility. A missed period is one of the most{" "}
                  <strong>reliable early signs</strong>. However, stress, weight
                  changes, or hormonal imbalances can also cause delays. If your
                  period is more than a week late, consider taking a pregnancy
                  test.
                </p>
              </li>

              <li className="border-l-4 border-primary pl-4">
                <h3 className="text-lg font-semibold text-base-content">
                  🤢 Nausea & Morning Sickness
                </h3>
                <p className="text-base-content">
                  Many women start experiencing nausea{" "}
                  <strong>as early as 2-3 weeks after conception</strong>. It’s
                  commonly known as <strong>morning sickness</strong>, but it
                  can occur at any time of the day. While some women have mild
                  nausea, others may vomit frequently. Eating small meals and
                  staying hydrated can help manage this symptom.
                </p>
              </li>

              <li className="border-l-4 border-primary pl-4">
                <h3 className="text-lg font-semibold text-base-content">
                  ⚡ Fatigue & Mood Swings
                </h3>
                <p className="text-base-content">
                  A sudden increase in <strong>progesterone levels</strong> can
                  make you feel <strong>exhausted</strong>. If you're sleeping
                  more than usual or feeling drained throughout the day, it
                  might be an early pregnancy symptom. Mood swings are also
                  common due to <strong>hormonal fluctuations</strong>, making
                  you feel more emotional than usual.
                </p>
              </li>

              <li className="border-l-4 border-primary pl-4">
                <h3 className="text-lg font-semibold text-base-content">
                  🏥 Tender or Swollen Breasts
                </h3>
                <p className="text-base-content">
                  Hormonal changes can cause your breasts to feel{" "}
                  <strong>sore, heavy, or swollen</strong>. Some women notice
                  their nipples becoming
                  <strong>darker and more sensitive</strong> in early pregnancy.
                  This symptom is similar to what happens before your period but
                  often lasts longer.
                </p>
              </li>

              <li className="border-l-4 border-primary pl-4">
                <h3 className="text-lg font-semibold text-base-content">
                  🚽 Frequent Urination
                </h3>
                <p className="text-base-content">
                  If you're finding yourself{" "}
                  <strong>running to the bathroom more often</strong>, it might
                  be due to pregnancy. The body increases blood flow to the
                  kidneys, leading to more frequent urination. This symptom
                  usually starts around <strong>6-8 weeks of pregnancy</strong>.
                </p>
              </li>

              <li className="border-l-4 border-primary pl-4">
                <h3 className="text-lg font-semibold text-base-content">
                  🍫 Food Cravings or Aversions
                </h3>
                <p className="text-base-content">
                  If you suddenly can’t stand certain foods or find yourself
                  craving unusual things, it could be a sign of pregnancy. Many
                  women develop
                  <strong>strong food aversions</strong> to smells or flavors
                  they previously enjoyed.
                </p>
              </li>

              <li className="border-l-4 border-primary pl-4">
                <h3 className="text-lg font-semibold text-base-content">
                  🩸 Light Spotting (Implantation Bleeding)
                </h3>
                <p className="text-base-content">
                  Some women notice <strong>light spotting</strong> around{" "}
                  <strong>6-12 days after conception</strong>. This is called
                  <strong>implantation bleeding</strong>, and it occurs when the
                  fertilized egg attaches to the uterus. It’s much lighter than
                  a regular period and usually stops within a day or two.
                </p>
              </li>

              <li className="border-l-4 border-primary pl-4">
                <h3 className="text-lg font-semibold text-base-content">
                  🌀 Dizziness & Headaches
                </h3>
                <p className="text-base-content">
                  Pregnancy can cause a <strong>drop in blood pressure</strong>,
                  leading to dizziness or lightheadedness. Hormonal changes may
                  also trigger
                  <strong>frequent headaches</strong>, especially in the early
                  weeks.
                </p>
              </li>

              <li className="border-l-4 border-primary pl-4">
                <h3 className="text-lg font-semibold text-base-content">
                  🌡️ Increased Basal Body Temperature
                </h3>
                <p className="text-base-content">
                  If you’ve been tracking your{" "}
                  <strong>basal body temperature (BBT)</strong>, you may notice
                  it remains <strong>higher than normal</strong> for more than
                  two weeks after ovulation. A consistently elevated BBT can be
                  an early sign of pregnancy.
                </p>
              </li>

              <li className="border-l-4 border-primary pl-4">
                <h3 className="text-lg font-semibold text-base-content">
                  🥄 Metallic Taste (Dysgeusia)
                </h3>
                <p className="text-base-content">
                  Some pregnant women report a{" "}
                  <strong>strange metallic taste</strong>
                  in their mouth, even when they’re not eating anything. This is
                  caused by hormonal changes and can make some foods taste
                  different than usual.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />

      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Pregnancy Diagnosis Result</h3>

          <div className="flex justify-center items-center mt-4">
            <div
              className="radial-progress text-primary"
              style={{
                "--value": pregnancyLikelihood,
                "--size": "6rem",
                "--thickness": "8px",
              }}
              aria-valuenow={pregnancyLikelihood}
              role="progressbar"
            >
              {pregnancyLikelihood}%
            </div>
          </div>

          <p className="py-4 text-lg text-center text-base-content">
            {pregnancyLikelihood >= 70
              ? "High chance of pregnancy"
              : pregnancyLikelihood >= 40
              ? "Moderate chance of pregnancy"
              : "Low chance of pregnancy"}
          </p>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PregnancyDiagnosis;
