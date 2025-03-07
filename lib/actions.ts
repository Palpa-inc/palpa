"use server";

export async function submitContactForm(formData: FormData) {
  const formSparkURL = "https://submit-form.com/RHHZmQ4Bi";

  try {
    // FormDataからJSONオブジェクトに変換
    const formValues: Record<string, string> = {};
    formData.forEach((value, key) => {
      formValues[key] = value.toString();
    });

    const response = await fetch(formSparkURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formValues),
    });

    return {
      success: response.ok,
    };
  } catch (error) {
    console.error("Form submission error:", error);
    return {
      success: false,
    };
  }
}
