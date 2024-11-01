import { fabric } from "fabric";
import { valuesGenerates } from "./values";

export const blueGold = (
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  color: string,
  columnColor?: string
) => {
  ctx.beginPath();
  var grd = ctx.createLinearGradient(350, 100, 380, 380);
  grd.addColorStop(0, columnColor + "00");
  grd.addColorStop(1, columnColor + "FF");
  ctx.fillStyle = grd;
  ctx.fillRect(canvasWidth * 0.275, 75, 70, 240);
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(canvasWidth * 0.28, canvasHeight * 0.3216, 65, 2);
  ctx.fillRect(canvasWidth * 0.28, canvasHeight * 0.41666, 65, 2);
  ctx.fillRect(canvasWidth * 0.27, 385, 276, 4);
  ctx.fillRect(canvasWidth * 0.4965, 405, 5, 110);
  ctx.fillRect(canvasWidth * 0.45, 532, 58, 4);
};

export const upperLines = async (
  canvasWidth: number,
  canvasHeight: number,
  color: string,
  columnColor?: string,
  total?: string,
  pos?: string,
  flag?: string,
  team?: string
) => {
  //! Değerlerin Arka Planı
  const grdReactValues = {
    width: canvasWidth / 7,
    height: canvasHeight / 3,
    top: canvasHeight * 0.192,
    left: canvasWidth * 0.19,
  };
  const grdRect = new fabric.Rect(grdReactValues);
  grdRect.set(
    "fill",
    new fabric.Gradient({
      type: "linear",
      gradientUnits: "percentage",
      coords: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1,
      },
      colorStops: [
        { offset: 0, color: "transparent" },
        { offset: 1, color: columnColor as string },
      ],
    })
  );

  //! Değerleri ayıran çizgiler
  const topHorizantalLineValues = {
    top: canvasHeight * 0.3,
    left:
      grdReactValues.left +
      (grdReactValues.width - grdReactValues.width * 0.8) / 2,
    width: grdReactValues.width * 0.8,
    height: canvasHeight * 0.005,
    fill: color,
  };
  const topHorizontalLine1 = new fabric.Rect(topHorizantalLineValues);
  const topHorizontalLine2 = new fabric.Rect({
    ...topHorizantalLineValues,
    top: canvasHeight * 0.4,
  });

  //! Değerleri yazıyoruz
  const clipRectTotalPoints = new fabric.Rect({ fill: "transparent" });
  const totalPoints = new fabric.Textbox(total ?? "99", {
    left: clipRectTotalPoints.left, // Kutunun yatay konumuyla hizalanır
    top: clipRectTotalPoints.top, // Kutunun dikey konumuyla hizalanır
    width: grdReactValues.width, // Metin genişliği kutu genişliğiyle sınırlıdır
    fontSize: canvasWidth * 0.125,
    fontFamily: "DIN-Condensed-Bold",
    textAlign: "center", // Yatayda ortalanır
    fill: color,
    originY: "center", // Dikey ortalama
    originX: "center", // Yatay ortalama
  });
  const totalPointsGroup = new fabric.Group(
    [clipRectTotalPoints, totalPoints],
    {
      left: grdReactValues.left,
      top: canvasHeight * 0.15,
      selectable: false,
    }
  );
  //! Position Gruplama ve ortalama

  const clipRectPosition = new fabric.Rect({ fill: "transparent" });

  const position = new fabric.Textbox(pos ?? "", {
    left: clipRectPosition.left, // Kutunun yatay konumuyla hizalanır
    top: clipRectPosition.top, // Kutunun dikey konumuyla hizalanır
    width: grdReactValues.width, // Metin genişliği kutu genişliğiyle sınırlıdır
    fontSize: canvasWidth * 0.08,
    fontFamily: "DIN-Condensed-Bold",
    textAlign: "center", // Yatayda ortalanır
    fill: color,
    originY: "center", // Dikey ortalama
    originX: "center", // Yatay ortalama
  });
  const positionGroup = new fabric.Group([clipRectPosition, position], {
    left: grdReactValues.left,
    top: canvasHeight * 0.23,
    selectable: false,
  });

  //! Resimlerin yüklenmesi
  const groupList = [
    grdRect,
    topHorizontalLine1,
    topHorizontalLine2,
    totalPointsGroup,
    positionGroup,
  ];
  if (flag) {
    const flagImage = await new Promise<fabric.Image>((resolve) => {
      fabric.Image.fromURL(flag, (img) => {
        // Ölçeklendirme oranını belirleme
        const scale = Math.max(
          grdReactValues.width / img.width!,
          grdReactValues.height / img.height!
        );

        img.scale(scale * 0.15);

        // Ortalamak için konum ayarları
        img.set({
          left:
            grdReactValues.left +
            (grdReactValues.width - grdReactValues.width * 0.8) / 2,
          top: canvasHeight * 0.333,
          // height: canvasHeight / 20,
          selectable: false,
        });
        resolve(img);
      });
    });
    groupList.push(flagImage as any);
  }

  if (team) {
    const teamImage = await new Promise<fabric.Image>((resolve) => {
      fabric.Image.fromURL(team, (img) => {
        const scale = Math.max(
          grdReactValues.width / img.width!,
          grdReactValues.height / img.height!
        );
        img.scale(scale * 0.15);
        img.set({
          left:
            grdReactValues.left +
            (grdReactValues.width - grdReactValues.width * 0.8) / 2,
          top: canvasHeight * 0.42,
          // width: grdReactValues.width * 0.8,
          // height: canvasHeight / 13.335,
          selectable: false,
        });
        resolve(img);
      });
    });
    groupList.push(teamImage as any);
  }

  // Grubu oluştur ve döndür
  const group = new fabric.Group(groupList, {
    left: canvasWidth * 0.19,
    top: canvasHeight * 0.15,
    selectable: false,
  });
  return group;
};

export const bottomLines = (
  canvasWidth: number,
  canvasHeight: number,
  color: string,
  name: string,
  pac: string,
  pas: string,
  def: string,
  sho: string,
  dri: string,
  phy: string
) => {
  //! Alt Taraf Çizgileri

  const bottomLineValues = {
    top: canvasHeight * 0.62,
    left: (canvasWidth - canvasWidth * 0.66) / 2, // Tam ortaya hizalanmış left değeri
    width: canvasWidth * 0.66,
    height: canvasHeight * 0.005,
    fill: color,
  };

  const bottomHorizontalLine1 = new fabric.Rect(bottomLineValues);
  const bottomHorizontalLine2 = new fabric.Rect({
    ...bottomLineValues,
    top: canvasHeight * 0.9,
    left: (canvasWidth - canvasWidth * 0.1) / 2, // Tam ortaya hizalanmış left değeri
    width: canvasWidth * 0.1,
  });
  const bottomVerticalLine1 = new fabric.Rect({
    top: canvasHeight * 0.88,
    left: (canvasWidth - canvasWidth * 0.01) / 2, // Tam ortaya hizalanmış left değeri
    width: canvasWidth * 0.01,
    // height: canvasHeight * 0.25,canvasHeight * 0.62
    height: canvasHeight * 0.62 - canvasHeight * 0.9 + 500,
    fill: color,
  });
  //! Alt Taraf Çizgileri

  //! Alt Taraf Değerler

  //! İsim Değerini Tam Ortalama (Gruplama)
  const boxWidth = canvasWidth * 0.66; // Kutu genişliği

  const clipRect = new fabric.Rect({ fill: "transparent" });
  // Metin objesini oluşturma ve clipRect içinde ortalama
  const nameValue = new fabric.Textbox(name.toUpperCase() ?? "", {
    left: clipRect.left, // Kutunun yatay konumuyla hizalanır
    top: clipRect.top, // Kutunun dikey konumuyla hizalanır
    width: boxWidth, // Metin genişliği kutu genişliğiyle sınırlıdır
    fontSize: canvasWidth * 0.14,
    fontFamily: "DIN-Condensed-Bold",
    textAlign: "center", // Yatayda ortalanır
    fill: color,
    originY: "center", // Dikey ortalama
    originX: "center", // Yatay ortalama
  });

  // Grup içinde birleştirme
  const nameGroup = new fabric.Group([clipRect, nameValue], {
    left: (canvasWidth - canvasWidth * 0.66) / 2, // Tam ortaya hizalanmış left değeri
    top: canvasHeight * 0.53,
    selectable: false,
  });

  //! İsim Değerini Tam Ortalama

  const bottomLeftValues = {
    left: (canvasWidth - canvasWidth * 0.66) / 2,
    top: canvasHeight * 0.63,
    fontSize: canvasWidth * 0.12,
    fontFamily: "DIN-Condensed-Bold",
    textAlign: "center",
    fill: color,
  };

  const PACValue = new fabric.Text(pac + " PAC", bottomLeftValues);
  const SHOValue = new fabric.Text(sho + " SHO", {
    ...bottomLeftValues,
    top: canvasHeight * 0.7,
  });
  const PASValue = new fabric.Text(pas + " PAS", {
    ...bottomLeftValues,
    top: canvasHeight * 0.77,
  });

  const bottomRightValues = {
    left: bottomLineValues.width - canvasWidth * 0.065,
    top: canvasHeight * 0.63,
    fontSize: canvasWidth * 0.12,
    fontFamily: "DIN-Condensed-Bold",
    textAlign: "center",
    fill: color,
  };
  const DRIValue = new fabric.Text(dri + " DRI", bottomRightValues);
  const DEFValue = new fabric.Text(def + " DEF", {
    ...bottomRightValues,
    top: canvasHeight * 0.7,
  });
  const PHYValue = new fabric.Text(phy + " PHY", {
    ...bottomRightValues,
    top: canvasHeight * 0.77,
  });

  //! Alt Taraf Değerler

  const group = new fabric.Group(
    [
      bottomHorizontalLine1,
      bottomHorizontalLine2,
      bottomVerticalLine1,
      nameGroup,
      PACValue,
      SHOValue,
      PASValue,
      DRIValue,
      DEFValue,
      PHYValue,
    ],
    {
      left: (canvasWidth - canvasWidth * 0.66) / 2,
      top: canvasHeight * 0.54,
      selectable: false,
    }
  );
  return group;
};
