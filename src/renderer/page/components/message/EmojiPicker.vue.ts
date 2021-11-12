import { defineComponent } from 'vue';
import emojis from './emojis1';

const EscapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const EmojiPicker = defineComponent({
  name: "EmojiPicker",
  props: {
    search: {
      type: String,
      required: false,
      default: '',
    },
    emojiTable: {
      type: Object,
      required: false,
      default() {
        return emojis
      },
    },
    emojiClicked: {
      type: Function,
      required: false,
    }
  },
  data() {
    return {
      display: {
        x: 0,
        y: 0,
        visible: false,
      },
    }
  },
  computed: {
    emojis() {
      if (this.search) {
        const obj = {}

        for (const category in this.emojiTable) {
          obj[category] = {}

          for (const emoji in this.emojiTable[category]) {
            if (new RegExp(`.*${EscapeRegExp(this.search)}.*`).test(emoji)) {
              obj[category][emoji] = this.emojiTable[category][emoji]
            }
          }

          if (Object.keys(obj[category]).length === 0) {
            delete obj[category]
          }
        }

        return obj
      }

      return this.emojiTable
    },
  },
  methods: {
    insert(emoji: any) {
      this.$emit("emojiSelected", emoji);
    },
  },
  directives: {
    'click-outside': {
      mounted(el: any, binding: any, vNode: any) {
        if (typeof binding.value !== 'function') {
          return
        }

        const bubble = binding.modifiers.bubble
        const handler = (e: any) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler

        document.addEventListener('click', handler)
      },
      unmounted(el: any, binding: any) {
        document.removeEventListener('click', el.__vueClickOutside__)

        el.__vueClickOutside__ = null
      },
    },
  },
});

export default EmojiPicker;