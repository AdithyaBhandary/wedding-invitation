# 📋 **Build Prompt: Angular Wedding Invitation Application**

## **Project Overview**
Build a beautiful, responsive Angular wedding invitation application that displays wedding details from a centralized JSON configuration file. The application should feature an elegant design with animations and be fully customizable through constants.

## **Project Structure Requirements**

```
src/
├── app/
│   ├── components/
│   │   ├── header/
│   │   ├── hero/
│   │   ├── about/
│   │   ├── venue/
│   │   ├── timeline/
│   │   ├── gallery/
│   │   ├── rsvp/
│   │   ├── footer/
│   │   └── [other components as needed]
│   ├── services/
│   │   └── data.service.ts
│   ├── models/
│   │   └── invitation.model.ts
│   ├── constants/
│   │   └── invitation-data.const.ts
│   ├── app.component.ts
│   ├── app.component.html
│   └── app.component.scss
├── styles/
│   ├── variables.scss
│   ├── mixins.scss
│   └── global.scss
├── assets/
│   └── [images, icons]
└── main.ts
```

## **Constants File (invitation-data.const.ts)**

Create a TypeScript constant file containing:
- **Couple Information**: Groom name, bride name, their story/bio
- **Event Details**: Wedding date, time, day of week
- **Venue Information**: Venue name, address, coordinates, directions link
- **Ceremony Details**: Ceremony location, time, duration
- **Reception Details**: Reception venue, time, special features
- **Event Schedule/Timeline**: Multiple events with times
- **Gallery**: Image URLs for photo gallery
- **Music/Theme**: Background music, theme colors
- **Contact Information**: Phone numbers, email, website
- **RSVP Settings**: Deadline, link, contact method
- **Social Media**: Links to couple's social accounts
- **Additional Details**: Dress code, parking info, accommodation suggestions, dietary preferences link

## **Data Model (invitation.model.ts)**

Define TypeScript interfaces for:
- `WeddingInvitation` (main interface)
- `Couple` (groom/bride details)
- `Venue` (all venue information)
- `Event` (ceremony, reception)
- `TimelineItem` (event timeline)
- `Guest` (RSVP functionality)

## **Components to Build**

1. **Header Component**: Navigation, couple names, main CTA
2. **Hero Section**: Eye-catching welcome banner with couple photo
3. **About/Story Component**: Couple's journey/how they met
4. **Venue Component**: Map, venue details, directions
5. **Timeline Component**: Ceremony → Reception timeline
6. **Events Component**: Detailed event schedule
7. **Countdown Component**: Real-time countdown timer (days, hours, minutes, seconds)
8. **Gallery Component**: Photo gallery with lightbox
9. **RSVP Component**: Form to capture guest responses
10. **Footer Component**: Contact info, social links, copyright

## **Features to Implement**

- ✅ Responsive design (mobile-first)
- ✅ Smooth scroll navigation
- ✅ Animation on scroll (fade-in, slide effects)
- ✅ Embedded Google Map for venue
- ✅ Image gallery with lightbox
- ✅ RSVP form (basic validation)
- ✅ Social media sharing buttons
- ✅ **Countdown Timer/Counter**: Display days, hours, minutes, seconds remaining until the wedding date with real-time updates
- ✅ Email/WhatsApp sharing links
- ✅ Dark/Light theme toggle (optional)
- ✅ Multilingual support setup (optional)

## **Styling Requirements**

- Use SCSS with variables for colors, fonts, spacing
- Implement consistent design system
- Mobile responsive (max-width breakpoints: 480px, 768px, 1024px, 1440px)
- Smooth transitions and animations
- Professional typography hierarchy
- Elegant color palette suitable for weddings

## **Data Flow**

1. `invitation-data.const.ts` → Central source of all wedding details
2. `data.service.ts` → Service to provide data to components
3. Components → Inject DataService and display formatted data
4. All changes should only require updates to the constants file

## **Key Requirements**

- **No hardcoded values in components** - all data from JSON constants
- **Type-safe** - use TypeScript interfaces
- **Reusable components** - build for maintainability
- **Accessible** - semantic HTML, alt text for images
- **SEO-friendly** - meta tags, structured data
- **Performance** - optimize images, lazy loading
- **Browser compatibility** - modern browsers support

## **Countdown Timer Implementation Details**

The countdown timer component should:
- Read the wedding date from `invitation-data.const.ts`
- Calculate remaining time (days, hours, minutes, seconds) in real-time
- Update every second using RxJS `interval()` or `setInterval()`
- Display in format: `D days, H hours, M minutes, S seconds`
- Handle different screen sizes (responsive display)
- Include smooth animations when numbers change
- Unsubscribe/cleanup on component destroy to prevent memory leaks
- Optional: Add sound effects or visual animations on certain milestones
- Optional: Show a message when the wedding date has passed

## **Development Notes**

- Use Angular best practices (standalone components if Angular 14+, or modules)
- Implement proper error handling
- Add loading states
- Use Angular animations module for smooth transitions
- Follow Angular style guide
- Add comments for complex logic
- Make the application feel premium and elegant

---

## **When ready to implement:**

1. Share the design/wireframes
2. Provide the specific wedding data (names, dates, venues, etc.)
3. Define color scheme and theme preferences
4. Specify any additional features or customizations

This prompt can be used with Claude, ChatGPT, or other AI tools to generate the complete implementation!
`