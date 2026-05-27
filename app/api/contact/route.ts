import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  nombre: z.string().min(2),
  telefono: z.string().min(10).max(15),
  destino: z.string().min(1),
  mensaje: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const data = schema.parse(body);

    await resend.emails.send({
      from: "Resorts All Inclusive <noreply@resorts-allinclusive.com>",
      to: ["contacto@resorts-allinclusive.com"],
      replyTo: undefined,
      subject: `Nueva cotización: ${data.destino} — ${data.nombre}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0D1A2E; color: #EDE8DF; border-radius: 12px;">
          <h2 style="color: #FF5C3E; margin-top: 0;">Nueva solicitud de cotización</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #B8B0A5; width: 120px;">Nombre:</td>
              <td style="padding: 8px 0; font-weight: 500;">${data.nombre}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #B8B0A5;">Teléfono:</td>
              <td style="padding: 8px 0;">
                <a href="tel:${data.telefono}" style="color: #FF5C3E;">${data.telefono}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #B8B0A5;">Destino:</td>
              <td style="padding: 8px 0; font-weight: 500;">${data.destino}</td>
            </tr>
            ${
              data.mensaje
                ? `<tr>
                <td style="padding: 8px 0; color: #B8B0A5; vertical-align: top;">Mensaje:</td>
                <td style="padding: 8px 0;">${data.mensaje}</td>
              </tr>`
                : ""
            }
          </table>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
  }
}
