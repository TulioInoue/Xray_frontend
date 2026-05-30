export const title = "X-ray classification";

export const navlinks = [
  {
    path: "/about",
    pathName: "about",
    icon: "fi fi-ss-terms-info",
    children: [],
  },
  {
    path: "/model",
    pathName: "model",
    icon: "fi fi-ss-robotic-arm",
    children: [],
  },
  {
    path: "/segmentation",
    pathName: "segmentation",
    icon: "fi fi-ss-haircut",
    children: [
      {
        path: "/cleaning",
        pathName: "cleaning",
        icon: "fi fi-ss-database-cleaning",
      },
      {
        path: "/training",
        pathName: "training",
        icon: "fi fi-ss-machine-learning",
      },
      {
        path: "/testing",
        pathName: "testing",
        icon: "fi fi-ss-blood-test-tube-alt",
      },
    ],
  },
  {
    path: "/classification",
    pathName: "classification",
    icon: "fi fi-ss-big-data-analytics",
    children: [
      {
        path: "/cleaning",
        pathName: "cleaning",
        icon: "fi fi-ss-database-cleaning",
      },
      {
        path: "/training",
        pathName: "training",
        icon: "fi fi-ss-machine-learning",
      },
      {
        path: "/testing",
        pathName: "testing",
        icon: "fi fi-ss-blood-test-tube-alt",
      },
    ],
  },
];
