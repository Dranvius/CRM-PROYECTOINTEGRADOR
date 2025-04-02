import {
  Document,
  Page,
  Text,
  View,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";

import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ListsContext } from "../context/ListsContext";


export const ViewPdf = () => {
  //Traer contexto
  const context = useContext(ListsContext);

  let param = useParams();

  let [datos, setDatos] = useState([]);
  let [loading,setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        let dats = await context.cotizacionDatos(param.index);
        setDatos(dats);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

return (
    <>
      {loading ? (
        <>
        <p>Cargando datos...</p>
        </>
      ) : (
      <>
          <PDFViewer style={{ height: "642.5px", width: "100%" }}>
            <Document title="Cotización">
              <Page size="A4" style={{ width: "100%" }}>
                <View
                  style={{
                    border: "1px",
                    width: "100%",
                    height: "100%",
                    paddingTop: "20px",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginLeft: "70px",
                      marginRight: "70px",
                      width: "500px",
                    }}
                  >
                    <Image
                      src="../src/img/logo.png"
                      source="error"
                      style={{ width: "100px", height: "100px" }}
                    ></Image>

                    <Text style={{ textAlign: "center", fontSize: "10px" }}>
                      0000/00/00
                    </Text>
                  </View>
                  <Text style={{ textAlign: "center" }}>Linares Modulares</Text>

                  <Text
                    style={{
                      textAlign: "left",
                      fontSize: "9.5px",
                      paddingBottom: "10px",
                      marginLeft: "70px",
                      //paddingTop: "20px",
                    }}
                  >
                    Nombre cliente :{" "}
                    {datos[0].firstname + " " + datos[0].lastname}
                  </Text>
                  <Text
                    style={{
                      textAlign: "left",
                      fontSize: "9.5px",
                      paddingBottom: "10px",
                      marginLeft: "70px",
                    }}
                  >
                    Telefono Cliente : {datos[0].numbercelphone}
                  </Text>
                  <Text
                    style={{
                      textAlign: "left",
                      fontSize: "9.5px",
                      paddingBottom: "10px",
                      marginLeft: "70px",
                    }}
                  >
                    Cédula cliente : {datos[0].cc}
                  </Text>
                  <Text
                    style={{
                      textAlign: "left",
                      fontSize: "9.5px",
                      paddingBottom: "10px",
                      marginLeft: "70px",
                    }}
                  >
                    Correo cliente : {datos[0].mail}
                  </Text>
                  <View
                    style={{
                      border: "1px",
                      marginLeft: "70px",
                      marginRight: "70px",
                      paddingbotton: "20px",
                    }}
                  >
                    <View
                      style={{
                        alignContent: "center",
                        backgroundColor: "gray",
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: "13px",
                          borderBottom: "1px",
                          BorderRight: "1px",
                          width: "13.333%",
                        }}
                      >
                        Cantidad
                      </Text>

                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: "13px",
                          borderBottom: "1px",
                          borderLeft: "1px",
                          borderRight: "1px",
                          BorderRight: "1px",
                          width: "60.333%",
                        }}
                      >
                        Descripción
                      </Text>
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: "13px",
                          borderBottom: "1px",
                          BorderRight: "1px",
                          width: "30.333%",
                        }}
                      >
                        Precio /u
                      </Text>
                    </View>

                    {datos.map((valor, i) => (
                      <View
                        key={i}
                        style={{
                          alignContent: "center",
                          width: "100%",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: "10px",
                            borderBottom: "1px",
                            BorderRight: "1px",
                            width: "13.333%",
                          }}
                        >
                          {valor.cantidad}
                        </Text>
                        <Text
                          style={{
                            textAlign: "left",
                            fontSize: "10px",
                            borderBottom: "1px",
                            borderLeft: "1px",
                            BorderRight: "1px",
                            width: "60.333%",
                            paddingLeft: "20px",
                          }}
                        >
                          {valor.nameproduct}
                        </Text>
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: "10px",
                            borderBottom: "1px",
                            borderLeft: "1px",
                            BorderRight: "1px",
                            width: "30.333%",
                          }}
                        >
                          {valor.price}
                        </Text>
                      </View>
                    ))}
                  </View>

                  <View style={{ display: "flex" }}>
                    <Text
                      style={{
                        textAlign: "left",
                        paddingLeft: "5px",
                        fontSize: "9.5px",
                        paddingBottom: "10px",
                        marginLeft: "390px",
                        marginRight: "70px",
                        borderLeft: "1px",
                        borderBottom: "1px",
                        borderRight: "1px",
                      }}
                    >
                      Iva 19%
                    </Text>
                  </View>
                  <View style={{ display: "flex" }}>
                    <Text
                      style={{
                        textAlign: "left",
                        paddingLeft: "5px",
                        fontSize: "9.5px",
                        paddingBottom: "10px",
                        marginLeft: "390px",
                        marginRight: "70px",
                        borderLeft: "1px",
                        borderBottom: "1px",
                        borderRight: "1px",
                      }}
                    >
                      Sub total : {parseInt(datos[0].valor) + (0.19*parseInt(datos[0].valor))}
                    </Text>
                  </View>
                  <View style={{ display: "flex", paddingBottom: "20px" }}>
                    <Text
                      style={{
                        backgroundColor: "gray",
                        textAlign: "left",
                        paddingLeft: "5px",
                        fontSize: "9.5px",
                        paddingBottom: "10px",
                        marginLeft: "390px",
                        marginRight: "70px",
                        borderLeft: "1px",
                        borderBottom: "1px",
                        borderRight: "1px",
                      }}
                    >
                      Total : {datos[0].valor}
                    </Text>
                    <View style={{ display: "flex" }}>
                      <Image
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATkAAAAjCAIAAABguervAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAABinSURBVHhe7Z15tI3V/8epqJC10qq0sGopC8tQt2uKxTWVwuIa6mYoLHPhUkLGzKHMhcIylJlFSwqXG5IpQ4ZknoooJEmU+r3c97a/u+c559xz7zmtn1v3/cdxnv3sZz97fz7vz7Sf57hZ//rrryyZyEQmbnrcYv6NDMePHx8+fHjlypVz5879zDPPLFy48MqVK+ZcJjKRiWggUlu9fPnyqFGjypUr98MPP0yePPnIkSOJiYkDBw7s2LHjuXPnTKdM/OuAunv16nXPPfdUr1593759pjUT/yQislWsEcscM2bMlClTiKuPPPIIynv66adnz569efPmt99++48//jBdM/F34OMuXLhwMxQg165dM9/CBsbZoEGDO+64Y//+/fHx8cuWLTMnMhT+/PPPjFUApr9evXTpUrdu3WbOnDlx4sRGjRplzZrVnMiShTGJsf369ZszZ06lSpVMayZSTHTp0qWTJk1atWoVh9WqVcPHPf744zobEFDq+++/37lz5+7du0lbDh48aE7cwKOPPvrQQw8VLly4YMGCefPmvfPOO82JkLh69Sr+9P3338+RI8fIkSPDvAqcPn26bdu2TzzxxKuvvnrbbbfNmDGDRdFiTkcVjIxf2Lp168mTJ7dt2/brr7+aEynIkydPiRIlihYtmj9/ftZ+991333JL6rEHcrKEBQsWTJs2jZSwYsWK5sRNj3TaqqyxTZs2KGzw4MG33367OXEDiDghISEuLg4u+s/+B4HJrV69unfv3qVLl+7UqdPDDz+Md0tOTh42bBimi7GZfjdA/6+//nrq1KmLFi26ePFi+fLlMQ/MMmfOnA8++GDu3Lnpc+bMGWj3+++/Y8bY8K5du3bs2AGD6VaqVKnixYtDYka2DIb66rZu3brPP/+8bNmyaLBy5crhG6oc9KlTp5jzvffeS0zu06dPlSpVnnzySdMjGvj555/xaKwdjxYTE8PCcWdIjLVrOeRrLISFY8OHDh3CjPfu3QvlqMXoWaxYMXkuSUk4ceIEnm7Dhg1JSUnYfNMUIEk3xtzkSKetyhTxzfPnz0c0ptUB4iA93rJly9y5cxGcaf2vAmN78803sShyDchn+UHV17hx4zfeeKNChQpqAVjpmjVrsOEvvviiXr16rVu3LlOmTPbs2c3pkODa8+fPHz58+MCBAyIxipCJFilSJFu2bNQpsDk2NhalhG+iAlT58MMPsdUPPvigatWqtGC0HA4aNAjSq0+EQCB4AcJdvnz58CMNGza8//77wzQnlkkCwkrluQCNx44dI3HArfCJl2TtJUuWJPsIJwLfdEABaQWEoBblWuLDb7/9Zlp9GDBgAH2WLFlijv+rwOVTw7/11luYjWm6geXLl8PyL7/80hz/9RchpWfPnnfddVft2rXJ/RC1OXET4JtvviFik0lZpS9cuLBLly5XrlzRYSRgpevXr8ecyAvIyX/55RdzIhM3kB5bJfGoXr06drhixQrTFAh4X/oMGTLEHP/3AP9INUlfly1b5rc6gkDdunUxY4KJWs6ePUsURWiYa+RkZQSCOVmfOY4M2CdWimchV1LLhQsXWrZsuWnTJh1GAoSDiBgcX0A2YVrTC0ZjkoQKIq1p+lcgPbYK/3D8UPDo0aOmKRBkq6+//jrVhWn6LwHGEHaoBt2waUGthSEhn/fee09mTMvAgQNpeemllyI3VFRD/swtGNY0RQZs8oEHHnAzqcWLF3ft2jVEYhU+qMyxUmz1s88+M03pBeudNm0aNQVjmqZ/C9JjqxMnToRSL7zwAgmbaQoE2Wrbtm39uV8GBcneTz/95I+Qfly7do3SrmbNmvv37zdNfwekhJpVqlT59ttv1UKNijFA2chJRmhiHMrgaEkeg8RKmZ6Nokw7Pj7+q6++0mEkYJLaRsZVRehZ8HGkJGXLlg3oHzM60myrBElCJZLt169faNb+a2wVpi5YsMBu7lNQ4aeSk5ODEQtDnTlzJgVnsLxD2S9DISK14AUo/GiJPA3B5gsXLhyV4GyhoNq8eXONqXzYZgQRArti8EKFCkVo+cwtMTExKsH55kSabdV6QaKraQqC6dOn0y2j26oYwEKEmJgYanUIwXesce/evabfDchQyT9twPQAUxw+fDiXv/jii3odAnz33XdkyzRGuBWniFqrVq1Tp06ZpoihoErVk5SUxCH2Scrw8ssvR8sXKE1r2LAhOYtpSjuYDBGVcRB+VDzITYg02yoCRawIxcaEYNA+cLT2Cf9fYO0KplL7nT59Wu0Y5K5duzA2Itgnn3xiySEehzBUsGXLFkwdUPabphtbrISXSJI3kmfSP0aObmDRhFnUuXPnOGTwhIQEUgOdjRyR84QER8V/qtkEt7h48aI5yGhIs63++OOPNWrUSNVWbfhFE6YpA0ImhKFigX5vrW0MzFW2QYfZs2eHqFEBgRQLRywEATeF3rBhA3fhXtzRNKURNq+OVmoqMEnFK6kbV8Jdorhtc/nyZQwsEp7IPyI9t/gPCIkoLi7u2LFjpilDIf05cGhbDdOkb3LMmTOHJYR4jCyilCtXDvpiseSxoXmMMcOqChUqHDlyxDSlwDqF9D1isRYV3TIV7N69u2jRoqT9J0+exFBZYNSrQcVVZp6+RyxUucwwnGxCybbWYpoyFP6ptzcowA4fPsyXAgUKqCUjghyYT+rSYK9JZs2atVGjRh07dqRPr169xo0bB2/MOR+QCUGPHKxZs2Zwy7SmIG/evIUKFeLUnj17TFPYQIvz5s3j1iTAHTp0yJkzpzkRMUj1586dS02O2+UTn9W/f3/ikjkdJeCk+CQZOX/+vFrCB1VJ3759mVv79u3dd78C4syZM4idSptawzRlLMhkwweRpF+/flw4ffp00xQIS5YsoU9sbOyBAwdM0z8AUkqqvrVr1xLGTVNUQVLAKtzCMiCoXUuUKEF8CLGFi9xGjx7NaHXq1LF1r4vJkydzNh3bQipTudZuq2BjxEAK6WDpQJjA2zLyfffdRyZFRN26das5EVXYV2vSui1ky1RXaDBh0aJFnrRFICWMYrH6T3PPjzTbKtAGb4gCA8rquU6wZ7Co5Ny5c5s3b05OToZqqW4qwLkVK1agGAKIcjzoOH/+fGrFihUr4ik9z77pw+AklnQzTenCmjVrWAWf5jgQqJESEhKwNBgT4qmDzXIXL15smv4O5qzKrXXr1mfPnjWtqQH+EUu5yu4qw2BibL169Qj1ATNq+Lp9+3Ykz2eILXp0pDdJAXqUMXAL0vjnU7B69eoQ4uVyNNKlSxdCGatu0aLF8ePHzTkfSF/pBgK+4BUMmIoGX758uVoIzlSkCDAxMTHVjJowG84O2T/HvbRaQXpsVQ/EQrwLYZ9AjBw50jTdACu3zypZ7VNPPVWlShWCkuwBnS1cuFA9LZApROzatSuBgoQTQpMsQUeUNGTIEAZkzYT6Pn364CM4nDZtGiqkhoyJiencubOfjrAZUWJdgwcPJmLw+c4770BracKFXD6UDUYglI1VaOcJErdr1y4g+5kY02PJzz77rHZTAwITlbmWLl166dKlnqG4BS6cdoRA6FAjlo8cWK999W/VqlVMibSwTZs2VJtqBFAH68KAGZ/+rAugAqbNyHBlwoQJLr3wQaiGwceOHYtUEdqsWbPKly+PTrkpp+BAsBcMUVn37t0JyGjt0KFDsHDgwIEh1s4EUC6T4XZcQlT0CJwRSF6GDRuGzWsQPhmQtdj3k1EfVkpw/vjjj0WGlEuvq3v8+PGuOQEu4cJUM6aoc0+gZ1qtAPzPVknMmNCIESNwIXAXW8fkAvoGPbYJsWmJH2IS/icQOHJxhfUjejs43xEECSdnPXU/CsB12W1YhMuwsBBhIThZl+Ql349DZWJ0o5G7892Nddxx5cqVWAJz8CNPnjxc7qZPDEKF6d8KErg7c0BcsIFDYk7Lli0DBmHtfzBnGwGCwbUo+qNOFCmgVHhAbczqdEeZEz3hjaiplqFDhzZv3tzduyamaf+ZkUnbdDmgf9OmTefMmcP4rmED5eR6PI5T7tGjB4uFu5ySwDkbcOOQVBmJMVvoZCdATz8fPGBw/CZrZGQxWEAIiKJatWqTJk1S+SC90M2SUC10HjVqVJMmTWzApB05+N+FRBGMiWkFZLgQXe5ZpMMKhOu2ijvHCzIDV0Y4XaSGreNF/PWVCrmA1o9QOnXqxFn7mgtg9nRmQMYnf/AISAvmEo/uoRSWYI0ByAsAGAnP1AiTEBYaJZ5QX7FmtSM1evKpQwYZPny4XSbDIlAiFUB8qIRBMFeAG7aqhUAMa3Vjobl52pOSkvyhlaFw4dwU3ShNTRUIhFkxc+IncYxV852ZuHLDODFRhsUwyP1OnDiBbejVfybs/kZHL0h41mWhisZau0DUYhBkxYr0iwL3jcVLly61atWKq/xvbiib5XbuK/iMTORJ1VYFQigxkPsSMFCK8kOPSFVQMIHRo0ejfdTH0mjh1p7f6DAfKOGxGeyK5JxMqn79+sRqv0xAdLknpM8KLLIoGtADayaPcq/n+9GjR1k8FtuzZ0/5VEEZSEDy2RhiCzMmgdBpYTEBtYUm8N/+HAlBwxJ7C6mcqTKUG6D0XIF2pMAlpjVlj56Z21eLlC7SzcYHP7jX1KlTESXrtSqHK8xcOY9atCLU4yl4uIQJezJDvUsg3pumvwN2Hj58GFKC0DWkCw3Lckg1CxYs2KxZM+bMF48DlfGAgKWgDN6fODAII7NAAjLicikLJHD/VVAT0XEvVwtAlHB/USQwHzSugo1oHyyP88D6PoD9x8XFwYr4+Hhm6+EPLkyKc92QjJBKge84OMwMD+52EKLLPZBuK7C4Hhu5U+jtRygoi3WzGrhSqFAhqh0dCghCD/rcW1q6eFRogRVBOE9+iDnhC1yPqG1JBrclCmA+dgvEfQ2AXKBOnTr2zTX7upU/QvqBiMks3NHQOi1cq10fFhLsUSqr6Nu3r9W9JZabZVgwms36LFAnzAu2c4Nh4wu0Z0PnunXrUhDSk6kSZDx8lZdhQFhi1+JCBu+uFDBPZsvgpIjQ2nVbwK7Ic5XeNKCdafjbmYNLFTogQ6WCLjB1EviAnpRLoOiMGTNIhunJgExPfg2XgePwOCnmjL4Itp5KDYfSv39/uZ5t27bBYXIEMgWdFaLLPSF9VuDi+rtd3CnVl3sBDMY1aqeBQ2YGA/QagDoAG0PsLeXbQtBFJZYnRMN1vJ27fisXRmNMNQLpiXbXCOnMtTRSdKmFyeNrcIGeqiwYUDDJoRtM0B+3oNYlNwvxSgCmgj9GtTr0C8RC9s8kOUuhgnwIL8ReJIyt0ojhYYemdwrgfc2aNSmiWrRowYVEFcUHoNjl8pUJMwLdPFHRAoEjdjejEyi5GVl1L/cizTtw4ACSBEibT+bm+REPAtcTKU9YUP7smQNftD1DO0oZMGAA6SVrJ+F/7bXXMFfSdbIbaxIClkkMxA9yCRcyrNTNaHgTj5NiPjNnzqSbZ18QmVCkKB2wToc4pLNC1LkH0mcFHlzfPGBchGUaQsJTunBXnCVeUz8oYbpSjPU9VhwdOnQImNohF1IU1uCh8o4dO8jd7fqBLVHcp3B8EUU45boMvtOCdKzNQAW64UEDTiNMEL5mzZqF88OWDh48GFDoIIXV1/Vkl+/XAdPQsxYmSRLoH4p6FcbgGtzCj25Xr161FIGjMgBJ3uWrlQyNAcMU0KaDS0oAaZo0aUI7NkN6CcmWLl3KKhApnFY7QvAYP1lAbGysq0fGpGbGGWF4mJnbn8vz58/PUB4VCwh53bp1hFxPPGcE2KJF4ZVs0MNb4Vk8QVUicgkgEJbhj74zVSbsD7y4V5xUFLmH6iXStFqBfIqFsdXwf97BGhITE62bZMbr16+fMGEC95Mnc/20fkvlStYDhR2PU+QWrMqty7mXUmsP6W1m4grRmgGitI3Dhg3Lnj07XkaH6QMTI86MHz+e0FesWDGCm7uPZ0Hopnok/1GsQwe2dLegYkEyITIiAbr36NHDTaWsKOCidEkL6vDcRZLxq98iIJsZCuXmy5eP8e3cUESNGjWqV69ODsWA/l/toW79b5XSIwJBLKgAp4aIPISjs/6DLjcW+YESURk1lzlOgeTpahbDYAmeYM4phUE9SjGtKcEtISFB5KQ/V7lDCaTZWIQlMIiceyNGjMiVK1eRIkXSYQXmIAXXf+DL0Hy6Mw4NUdYTzf3pOGc1eLD3aW2S5mYLXMXIVHHIyDTdyMoYnFWZphveiMs9qpK/dF0GSoJqxYsXx5GHv0wPWDX0sk6KQ+ZJVgbw1u5WucIpLky7ER4dCHrTGFoEdLQhoNUBW/7BV9jvYZJiZsBbA0spD5sJj+WfeIJ24Im3AC3Q7pkz3zt37ty4cWNOkZ8jIgKv+3zFBaLDXcbExDB/zx5pqmB1rJG7sChlCswchTKUxx/pqbjnB7EopWvXrtadaZvGk/8zILmMZxs2Qu7t27dP/iV9VmCOU5BFNu2ZdKrA/TBLu+Ep98Y47maj3c4JGLRRG7znrMe1MxRByd1fRRYBXaC24Lipq3VMSPsilmryLNQ/tL+Q2v9lEQxc1bFjR7foEhRDevXqxTQg6Lvvvks5QCNUoARV4hRwC162lNYflygYciGW5hoMEti4caM5SNl/0jaEpxITxAMoBQXdLWt02qBBg5IlS3JhwKCnHBiOmuMbQw0aNEi1D2xDcdzdnP471Llly5YYkj/zDA2uRfvcwq9uu8NkoYcrnkeG3BoNqqcliUc1hBkY4tpe5NxDMmXKlKExQisAWWzvtP4PGpiiJkQ65zdUAGvLly8f8Pf+kh0Rifu6fprJkaW4aSE9Val7HBhTVWbCpztt5ZbW9Wh1YjYOEpdvN2PCByTGo+NxQ8iHU3v27CFtkyiYABkg02ONJ06cMJ0c6EdwaYrzKB4TYsy6det6tOiB9ZIBtyEQL7NCSu5DFAbHo8nkYKFfZXqQ6BmTodAXilYlFTpUqvOxY8dYhed5RqrgWqSKxKBNqhKTT3G3S7nc3bdnddASl+G+ciDuuUuICvcwOWqHCK1AuP4uhEiAIMaNGxeCjn4QQPRiJM7e/2K33jT0e1CmSP7Wu3fvTz/9lFna2MIKmSIRyVUGK4Q6fvaoHcNw9+WAckvVVJIFCYaYLdnVqlVLO2HhgBHIO1DqvHnz/HVpMGAqrKJgwYLMxIKS70fnJW90z8SAS4IQIH1S0sWSLeeCwdqV33hwWNBi7dq16MXyg/4QAEcTHx/PVZ69U0H8xvla6TENvAafiFqvfwfMIACj4cfr16+va5V/8qmzqYLMhVVzCeoLh58SFCvVISbk2bfXD0tcRykTwB2zFrWAqHBvx44dkVuBYN4xRFs9evTgGmYc8P0mP8jHiDZYePfu3fXU0QPopReY0JNpSmkcO3YsM4Mlqs5xWlAHLxgXFwe33CmqRPF7UxQmx+avqZT/UJlgMFOmTLF71AIq4UI8Cxbol4UHmBbkqFOnzvbt201T2CAbZBpoVI+ILl68iE16rF2xwr8EP5AVZR4DonJ3WzgYGFCbK+TkdnDujschxUBZ8hR4dOorvC2S59SCBQu4xG5ZeYBqOAvtcMEc4ppxYdYAVNR5amYBmaNuTpGe2BZoFmbZpayNW6M4LjStIZGUlARn4DPXDh06FP/i+Q2DbNV6FomXKbnjR4t7kVuBxf/eB0aXK1euRH958uTp37+/nrCbcw6oRtatW8cytMuHWw04rsBZ5gHDcCHJycmUFoQ1u+PPhSj7+eefx51PmjTJDTvCzJSN5YDelM6c9T+NoAW3xFXBnAhDMYFixYrB2p07d/pHZlaQFTnGxsaOHz8+TH64kCUwh2DbCQI3wn0SrDDsEN2YDKUvowVMXoKBVAKu4AtQP5LHIJkSyaECKWDtrVq1Qh2EU/JSu3MTzHdowwapJiYmvvLKKxitOxnEqEembdq0EXPEQu5IuuveV0BNRH7u7nmA7AKZoGKlvhRonhFCgMkgWEgFkK3ffajsb9++PX6HIMnCMWzClTmdgihyL0IrsPD+jQzC96ZNm+bOnfvRRx9xyA1KlSqlP9Bw/Pjxbdu2bdy4sVq1as899xxDqyQLDWa8ePFiXF2BAgXwGfgC96+MhIYm89hjj6Xp99MsHvVky5YtV65cpskHFIO/nD59OpyWHG+99VbaWSM+mAvbtWtXu3bt8KfqAlvFNhYtWtStWze9ZBMC5Eh9+vRBbdhApUqV7EpZBV4Z3z9mzBjO4vUZDTeqs+Hg0qVL+HKQI0cOxF61atXQ+jp//jxZAF4s2F0wV8IvuRyLqlmzpkcpEAn7Z7ZELSRAi8JF48aNCbnq4+Ly5cv4kVGjRuEymjZt6v7dHWZOkGEown7p0qUxGIJwdP/wDDQm/9y8eTNrwaXCTM9fzYgu9yKxAovMv2ueiUxkBGTJ8n/MGDfUwDQ31AAAAABJRU5ErkJggg=="
                        style={{
                          textAlign: "left",
                          paddingLeft: "5px",
                          fontSize: "9.5px",
                          paddingBottom: "10px",
                          marginLeft: "70px",
                          marginRight: "390px",
                        }}
                      ></Image>

                      <Text
                        style={{
                          textAlign: "left",
                          paddingLeft: "5px",
                          fontSize: "9.5px",
                          paddingBottom: "10px",
                          marginLeft: "70px",
                          marginRight: "390px",
                        }}
                      >
                        Nombre: Sergio Linares
                      </Text>
                      <Text
                        style={{
                          textAlign: "left",
                          paddingLeft: "5px",
                          fontSize: "9.5px",
                          paddingBottom: "10px",
                          marginLeft: "70px",
                          marginRight: "390px",
                        }}
                      >
                        Nombre: +573202813850
                      </Text>
                    </View>
                  </View>
                </View>
              </Page>
            </Document>
          </PDFViewer>
      </>
    )}
    </>
)
};
