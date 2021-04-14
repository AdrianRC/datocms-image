import {
  defineComponent,
  PropType,
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  h,
} from "vue-demi";

interface ImageData {
  aspectRatio: number;
  width: number;
  base64?: string;
  height?: number;
  sizes?: string;
  src: string;
  srcSet?: string;
  webpSrcSet?: string;
  bgColor?: string;
  alt: string;
  title: string;
}

const isSsr = typeof window === "undefined";

const universalBtoa = isSsr
  ? (str: string) => Buffer.from(str.toString(), "binary").toString("base64")
  : window.btoa;

const absolutePositioning = {
  position: "absolute",
  left: "0px",
  top: "0px",
  width: "100%",
  height: "100%",
};

export default defineComponent({
  name: "DatoCMS-Image",
  props: {
    data: {
      type: Object as PropType<ImageData>,
      required: true,
    },
    pictureClass: {
      type: String,
    },
    fadeInDuration: {
      type: Number,
      default: 500,
    },
    intersectionTreshold: {
      type: Number,
      default: 0,
    },
    intersectionMargin: {
      type: String,
      default: "0px 0px 0px 0px",
    },
    lazyLoad: {
      type: Boolean,
      default: true,
    },
    pictureStyle: {
      type: Object,
      default: {},
    },
    rootStyle: {
      //Is this necessary? Vue does automatic passthrough for class + style
      type: Object,
      default: {},
    },
    explicitWidth: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const observer = ref<IntersectionObserver | null>(null);
    const el = ref<HTMLElement | null>(null);
    const inView = ref(false);
    const loaded = ref(false);

    const shouldAddImage = computed(() => {
      if (!props.lazyLoad) {
        return true;
      }

      if (typeof window === "undefined") {
        return false;
      }

      if ("IntersectionObserver" in window) {
        return inView.value || loaded.value;
      }

      return true;
    });

    const shouldShowImage = computed(() => {
      if (!props.lazyLoad) {
        return true;
      }

      if (typeof window === "undefined") {
        return false;
      }

      if ("IntersectionObserver" in window) {
        return loaded.value;
      }

      return true;
    });

    onMounted(() => {
      if ("IntersectionObserver" in window) {
        observer.value = new IntersectionObserver(
          (entries) => {
            const image = entries[0];
            if (image.isIntersecting && observer.value) {
              inView.value = true;
              observer.value.disconnect();
            }
          },
          {
            threshold: props.intersectionTreshold,
            rootMargin: props.intersectionMargin,
          }
        );
        if (el.value) {
          observer.value.observe(el.value);
        }
      }
    });

    onBeforeUnmount(() => {
      if ("IntersectionObserver" in window && observer.value) {
        observer.value.disconnect();
      }
    });

    function load() {
      // where does srcPlaceholder come from?
      // if (el.value?.getAttribute("src") !== srcPlaceholder.value) {}
      loaded.value = true;
    }

    const height = computed(
      () => props.data.height || props.data.width / props.data.aspectRatio
    );

    const transition = computed(() =>
      props.fadeInDuration
        ? `opacity ${props.fadeInDuration}ms ${props.fadeInDuration}ms`
        : null
    );

    const svg = computed(
      () =>
        `<svg xmlns="http://www.w3.org/2000/svg" width="${props.data.width}" height="${height.value}"></svg>`
    );

    return () =>
      h(
        "div",
        {
          style: {
            display: props.explicitWidth ? "inline-block" : "block",
            overflow: "hidden",
            ...props.rootStyle,
            position: "relative",
          },
          ref: el,
        },
        [
          h("img", {
            class: props.pictureClass, //should this go on picture elem?
            style: {
              display: "block",
              width: props.explicitWidth ? `${props.data.width}px` : "100%",
              ...props.pictureStyle, //should this go on picture elem?
            },
            src: `data:image/svg+xml;base64,${universalBtoa(svg.value)}`,
            role: "presentation",
          }),
          h("div", {
            style: {
              backgroundImage: props.data.base64
                ? `url(${props.data.base64})`
                : null,
              backgroundColor: props.data.bgColor,
              backgroundSize: "cover",
              opacity: shouldShowImage.value ? 0 : 1,
              transition: transition.value,
              ...absolutePositioning,
            },
          }),
          shouldAddImage.value
            ? h("picture", null, [
                props.data.webpSrcSet
                  ? h("source", {
                      srcset: props.data.webpSrcSet,
                      sizes: props.data.sizes,
                      type: "image/webp",
                    })
                  : null,
                props.data.srcSet
                  ? h("source", {
                      srcset: props.data.srcSet,
                      sizes: props.data.sizes,
                    })
                  : null,
                h("img", {
                  src: props.data.src,
                  alt: props.data.alt,
                  title: props.data.title,
                  onLoad: load,
                  class: props.pictureClass,
                  style: {
                    ...absolutePositioning,
                    ...props.pictureStyle,
                    opacity: shouldShowImage.value ? 1 : 0,
                    transition: transition.value,
                  },
                }),
              ])
            : null,
          h("noscript", null, [
            h("picture", null, [
              props.data.webpSrcSet
                ? h("source", {
                    srcset: props.data.webpSrcSet,
                    sizes: props.data.sizes,
                    type: "image/webp",
                  })
                : null,
              props.data.srcSet
                ? h("source", {
                    srcset: props.data.srcSet,
                    sizes: props.data.sizes,
                  })
                : null,
              h("img", {
                src: props.data.src,
                alt: props.data.alt,
                title: props.data.title,
                class: props.pictureClass,
                style: {
                  ...props.pictureStyle,
                  ...absolutePositioning,
                },
                loading: "lazy",
              }),
            ]),
          ]),
        ]
      );
  },
});
