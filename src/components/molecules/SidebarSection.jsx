import Label from '../atoms/Label';

      const SidebarSection = ({ title, children }) => {
        return (
          <div>
            <Label as="h3" className="mb-3">
              {title}
            </Label>
            <div className="space-y-2">{children}</div>
          </div>
        );
      };

      export default SidebarSection;